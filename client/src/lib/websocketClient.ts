/**
 * WebSocket Client Utility
 * Handles WebSocket connection, reconnection, and event management
 */

import { WebSocketMessage, WebSocketEventType } from "@/types/notifications";

interface WebSocketConfig {
  url: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  maxReconnectDelay?: number;
  heartbeatInterval?: number;
  token?: string;
}

interface WebSocketEventHandler {
  (message: WebSocketMessage): void;
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private config: Required<WebSocketConfig>;
  private reconnectAttempts: number = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private eventHandlers: Map<WebSocketEventType | string, WebSocketEventHandler[]> = new Map();
  private connectionStatus: "connecting" | "connected" | "disconnected" | "error" = "disconnected";
  private messageQueue: WebSocketMessage[] = [];

  constructor(config: WebSocketConfig) {
    this.url = config.url;
    this.config = {
      reconnectAttempts: config.reconnectAttempts || 5,
      reconnectDelay: config.reconnectDelay || 1000,
      maxReconnectDelay: config.maxReconnectDelay || 30000,
      heartbeatInterval: config.heartbeatInterval || 30000,
      token: config.token || "",
      ...config,
    };
  }

  /**
   * Connect to WebSocket server
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.connectionStatus = "connecting";
        this.emit("status", { status: "connecting" });

        const wsUrl = `${this.url}${this.config.token ? `?token=${this.config.token}` : ""}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.connectionStatus = "connected";
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.flushMessageQueue();
          this.emit("status", { status: "connected" });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        this.ws.onerror = (error) => {
          this.connectionStatus = "error";
          this.emit("status", { status: "error", error });
          reject(error);
        };

        this.ws.onclose = () => {
          this.connectionStatus = "disconnected";
          this.stopHeartbeat();
          this.emit("status", { status: "disconnected" });
          this.attemptReconnect();
        };
      } catch (error) {
        this.connectionStatus = "error";
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  public disconnect(): void {
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connectionStatus = "disconnected";
    this.emit("status", { status: "disconnected" });
  }

  /**
   * Send message to server
   */
  public send(message: WebSocketMessage): void {
    if (this.connectionStatus === "connected" && this.ws) {
      try {
        this.ws.send(JSON.stringify(message));
      } catch (error) {
        console.error("Failed to send WebSocket message:", error);
        this.messageQueue.push(message);
      }
    } else {
      this.messageQueue.push(message);
    }
  }

  /**
   * Subscribe to event type
   */
  public on(eventType: WebSocketEventType | string, handler: WebSocketEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  /**
   * Unsubscribe from event type
   */
  public off(eventType: WebSocketEventType | string, handler: WebSocketEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Get current connection status
   */
  public getStatus(): typeof this.connectionStatus {
    return this.connectionStatus;
  }

  /**
   * Check if connected
   */
  public isConnected(): boolean {
    return this.connectionStatus === "connected";
  }

  /**
   * Private: Handle incoming message
   */
  private handleMessage(message: WebSocketMessage): void {
    // Emit to specific event type handlers
    const handlers = this.eventHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => handler(message));
    }

    // Emit to wildcard handlers
    const wildcardHandlers = this.eventHandlers.get("*");
    if (wildcardHandlers) {
      wildcardHandlers.forEach((handler) => handler(message));
    }
  }

  /**
   * Private: Emit status or internal event
   */
  private emit(eventType: string, data: any): void {
    const message: WebSocketMessage = {
      type: eventType as WebSocketEventType,
      data,
      timestamp: new Date(),
    };
    this.handleMessage(message);
  }

  /**
   * Private: Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.reconnectAttempts) {
      console.error("Max reconnection attempts reached");
      this.emit("status", { status: "error", error: "Max reconnection attempts reached" });
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      this.config.maxReconnectDelay
    );

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.connect().catch((error) => {
        console.error("Reconnection failed:", error);
      });
    }, delay);
  }

  /**
   * Private: Start heartbeat mechanism
   */
  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected()) {
        this.send({
          type: WebSocketEventType.HEARTBEAT,
          data: { timestamp: new Date().toISOString() },
          timestamp: new Date(),
        });
      }
    }, this.config.heartbeatInterval);
  }

  /**
   * Private: Stop heartbeat mechanism
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * Private: Flush queued messages when reconnected
   */
  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0 && this.isConnected()) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }
}

/**
 * Create and manage singleton WebSocket instance
 */
let wsInstance: WebSocketClient | null = null;

export function createWebSocketClient(config: WebSocketConfig): WebSocketClient {
  if (!wsInstance) {
    wsInstance = new WebSocketClient(config);
  }
  return wsInstance;
}

export function getWebSocketClient(): WebSocketClient | null {
  return wsInstance;
}

export function closeWebSocketClient(): void {
  if (wsInstance) {
    wsInstance.disconnect();
    wsInstance = null;
  }
}

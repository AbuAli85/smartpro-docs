import { useEffect, useRef, useState } from 'react';
import { WebSocketClient } from '@/lib/websocket';

interface UseWebSocketOptions {
  url: string;
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export function useWebSocket(options: UseWebSocketOptions) {
  const clientRef = useRef<WebSocketClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!options.autoConnect) return;

    const client = new WebSocketClient(options.url);
    clientRef.current = client;

    client.connect()
      .then(() => {
        setIsConnected(true);
        options.onConnect?.();
      })
      .catch((error) => {
        setIsConnected(false);
        options.onError?.(error);
      });

    return () => {
      client.disconnect();
      setIsConnected(false);
      options.onDisconnect?.();
    };
  }, [options.url, options.autoConnect, options]);

  const send = (type: string, data: any) => {
    if (clientRef.current) {
      clientRef.current.send(type, data);
    }
  };

  const on = (type: string, handler: (data: any) => void) => {
    if (clientRef.current) {
      clientRef.current.on(type, handler);
    }
  };

  const off = (type: string) => {
    if (clientRef.current) {
      clientRef.current.off(type);
    }
  };

  return {
    isConnected,
    send,
    on,
    off,
    client: clientRef.current,
  };
}

/**
 * Logging Service
 * Centralized logging with different log levels and formats
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
  requestId?: string;
  userId?: string;
  ip?: string;
  path?: string;
  method?: string;
}

class Logger {
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, data, error, requestId, userId, ip, path, method } = entry;

    let log = `[${timestamp}] ${level}`;

    if (requestId) log += ` [${requestId}]`;
    if (userId) log += ` [user:${userId}]`;
    if (ip) log += ` [ip:${ip}]`;
    if (method && path) log += ` ${method} ${path}`;

    log += `: ${message}`;

    if (data && (this.isDevelopment || level === LogLevel.ERROR)) {
      log += `\n  Data: ${JSON.stringify(data, null, 2)}`;
    }

    if (error) {
      log += `\n  Error: ${error.message}`;
      if (error.stack && this.isDevelopment) {
        log += `\n  Stack: ${error.stack}`;
      }
    }

    return log;
  }

  private writeLog(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const formatted = this.formatLog(entry);

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.ERROR:
        console.error(formatted);
        break;
    }
  }

  debug(message: string, data?: any, context?: Partial<LogEntry>): void {
    this.writeLog({
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date().toISOString(),
      data,
      ...context,
    });
  }

  info(message: string, data?: any, context?: Partial<LogEntry>): void {
    this.writeLog({
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      data,
      ...context,
    });
  }

  warn(message: string, data?: any, context?: Partial<LogEntry>): void {
    this.writeLog({
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      data,
      ...context,
    });
  }

  error(message: string, error?: Error, data?: any, context?: Partial<LogEntry>): void {
    this.writeLog({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      error,
      data,
      ...context,
    });
  }

  // Request logging helper
  request(req: any, res: Response, responseTime?: number): void {
    const statusCode = res.statusCode;
    const level = statusCode >= 500 ? LogLevel.ERROR : statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;

    this.writeLog({
      level,
      message: `${req.method} ${req.path} - ${statusCode}`,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      ip: req.ip || req.socket.remoteAddress,
      userId: (req as any).userId,
      data: {
        statusCode,
        responseTime: responseTime ? `${responseTime}ms` : undefined,
        userAgent: req.get('user-agent'),
      },
    });
  }
}

// Singleton instance
export const logger = new Logger();

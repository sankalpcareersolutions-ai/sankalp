/**
 * CareerCounsellingHub - Structured Logger Service
 * Comprehensive multi-channel logging for Booking, Email, WhatsApp, Calendar, Meet, Error & Performance.
 */

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
export type LogChannel = 'BOOKING' | 'EMAIL' | 'WHATSAPP' | 'CALENDAR' | 'MEET' | 'SYSTEM' | 'SECURITY' | 'PERFORMANCE';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  channel: LogChannel;
  event: string;
  message: string;
  bookingId?: string;
  recipient?: string;
  metadata?: Record<string, any>;
  durationMs?: number;
  error?: string;
}

class LoggerService {
  private logs: LogEntry[] = [];
  private maxLogs = 500;

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private addLog(entry: Omit<LogEntry, 'id' | 'timestamp'>): LogEntry {
    const fullEntry: LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: this.formatTimestamp(),
      ...entry,
    };

    this.logs.unshift(fullEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Standard structured stdout output
    const consolePrefix = `[${fullEntry.timestamp}] [${fullEntry.level}] [${fullEntry.channel}] [${fullEntry.event}]`;
    if (fullEntry.level === 'ERROR') {
      console.error(`${consolePrefix} ${fullEntry.message}`, fullEntry.error || '', fullEntry.metadata || '');
    } else if (fullEntry.level === 'WARN') {
      console.warn(`${consolePrefix} ${fullEntry.message}`, fullEntry.metadata || '');
    } else {
      console.log(`${consolePrefix} ${fullEntry.message}`, fullEntry.metadata ? JSON.stringify(fullEntry.metadata) : '');
    }

    return fullEntry;
  }

  public info(channel: LogChannel, event: string, message: string, metadata?: Record<string, any>, bookingId?: string, recipient?: string) {
    return this.addLog({ level: 'INFO', channel, event, message, metadata, bookingId, recipient });
  }

  public warn(channel: LogChannel, event: string, message: string, metadata?: Record<string, any>, bookingId?: string, recipient?: string) {
    return this.addLog({ level: 'WARN', channel, event, message, metadata, bookingId, recipient });
  }

  public error(channel: LogChannel, event: string, message: string, errorObj?: any, metadata?: Record<string, any>, bookingId?: string, recipient?: string) {
    const errorStr = errorObj instanceof Error ? `${errorObj.message}\n${errorObj.stack}` : typeof errorObj === 'string' ? errorObj : JSON.stringify(errorObj);
    return this.addLog({
      level: 'ERROR',
      channel,
      event,
      message,
      error: errorStr,
      metadata,
      bookingId,
      recipient,
    });
  }

  public performance(event: string, durationMs: number, metadata?: Record<string, any>) {
    return this.addLog({
      level: 'INFO',
      channel: 'PERFORMANCE',
      event,
      message: `Completed in ${durationMs.toFixed(2)}ms`,
      durationMs,
      metadata,
    });
  }

  public getLogs(filter?: {
    channel?: LogChannel;
    level?: LogLevel;
    bookingId?: string;
    search?: string;
    limit?: number;
  }): LogEntry[] {
    let result = [...this.logs];
    if (filter?.channel) {
      result = result.filter(l => l.channel === filter.channel);
    }
    if (filter?.level) {
      result = result.filter(l => l.level === filter.level);
    }
    if (filter?.bookingId) {
      result = result.filter(l => l.bookingId === filter.bookingId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(l => 
        l.message.toLowerCase().includes(q) ||
        l.event.toLowerCase().includes(q) ||
        (l.recipient && l.recipient.toLowerCase().includes(q)) ||
        (l.bookingId && l.bookingId.toLowerCase().includes(q))
      );
    }
    const limit = filter?.limit || 100;
    return result.slice(0, limit);
  }

  public clearLogs() {
    this.logs = [];
  }
}

export const logger = new LoggerService();

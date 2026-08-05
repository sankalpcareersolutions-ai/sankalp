/**
 * CareerCounsellingHub - Resilient Retry Mechanism
 * Handles transient failures with exponential backoff and jitter.
 */

import { logger, LogChannel } from './logger';

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  channel?: LogChannel;
  operationName?: string;
  bookingId?: string;
  shouldRetry?: (error: any) => boolean;
}

export async function executeWithRetry<T>(
  fn: (attempt: number) => Promise<T>,
  options: RetryOptions = {}
): Promise<{ result: T | null; attempts: number; success: boolean; error?: any }> {
  const {
    maxRetries = 3,
    initialDelayMs = 500,
    maxDelayMs = 5000,
    backoffFactor = 2,
    channel = 'SYSTEM',
    operationName = 'AsyncOperation',
    bookingId,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;
  let lastError: any = null;

  while (attempt < maxRetries) {
    attempt++;
    const startTime = performance.now();
    try {
      logger.info(channel, `${operationName}_ATTEMPT`, `Starting attempt ${attempt}/${maxRetries} for ${operationName}`, { attempt }, bookingId);
      const result = await fn(attempt);
      const duration = performance.now() - startTime;
      logger.performance(`${operationName}_SUCCESS`, duration, { attempt, bookingId });
      return { result, attempts: attempt, success: true };
    } catch (error: any) {
      lastError = error;
      const duration = performance.now() - startTime;
      logger.warn(channel, `${operationName}_FAILED`, `Attempt ${attempt}/${maxRetries} failed: ${error?.message || error}`, {
        attempt,
        error: error?.message || error,
        durationMs: duration,
      }, bookingId);

      if (attempt >= maxRetries || !shouldRetry(error)) {
        break;
      }

      // Exponential backoff + Jitter
      const jitter = Math.random() * 200;
      const nextDelay = Math.min(delay * Math.pow(backoffFactor, attempt - 1) + jitter, maxDelayMs);
      logger.info(channel, `${operationName}_WAIT`, `Backing off for ${Math.round(nextDelay)}ms before attempt ${attempt + 1}`, { nextDelay }, bookingId);
      await new Promise((resolve) => setTimeout(resolve, nextDelay));
    }
  }

  logger.error(channel, `${operationName}_EXHAUSTED`, `All ${maxRetries} attempts failed for ${operationName}`, lastError, { bookingId }, bookingId);
  return { result: null, attempts: attempt, success: false, error: lastError };
}

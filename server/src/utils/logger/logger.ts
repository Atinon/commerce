import { Env, NODE_ENVS } from "../../config/env.js";

const LOG_LEVEL = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
} as const;

type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

type LogMeta = Record<string, unknown>;

type LogEntry = {
  timestamp: string;
  level: LogLevel;
  message: string;
  meta?: LogMeta;
};

let isTestEnv = false;

export function configureLogger(env: Env) {
  isTestEnv = env.NODE_ENV === NODE_ENVS.TEST;
}

function shouldLog(): boolean {
  return !isTestEnv;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  meta?: LogMeta,
): LogEntry {
  return {
    timestamp: new Date().toLocaleTimeString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  };
}

function formatForConsole(logEntry: LogEntry) {
  const meta =
    logEntry.meta && Object.keys(logEntry.meta).length > 0
      ? `${JSON.stringify(logEntry.meta)}`
      : "";

  return `[${logEntry.timestamp} | ${logEntry.level}] ${logEntry.message} ${meta}`;
}

function write(logEntry: LogEntry) {
  if (!shouldLog()) return;
  const formatted = formatForConsole(logEntry);
  switch (logEntry.level) {
    case LOG_LEVEL.INFO:
      console.log(formatted);
      return;
    case LOG_LEVEL.WARN:
      console.warn(formatted);
      return;
    case LOG_LEVEL.ERROR:
      console.error(formatted);
      return;
  }
}

export const logger = {
  info: (message: string, meta?: LogMeta) => {
    write(createLogEntry(LOG_LEVEL.INFO, message, meta));
  },
  warn: (message: string, meta?: LogMeta) => {
    write(createLogEntry(LOG_LEVEL.WARN, message, meta));
  },
  error: (message: string, meta?: LogMeta) => {
    write(createLogEntry(LOG_LEVEL.ERROR, message, meta));
  },
};

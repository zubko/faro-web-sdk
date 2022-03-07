import { agent, allLogLevels, LogLevel } from '@grafana/agent-core';
import type { Instrumentation } from '@grafana/agent-core';

export interface ConsoleInstrumentationOptions {
  disabledLevels?: LogLevel[];
}

export default function getConsoleInstrumentation({
  disabledLevels,
}: ConsoleInstrumentationOptions = {}): Instrumentation {
  const defaultDisabledLevels: LogLevel[] = [LogLevel.DEBUG, LogLevel.LOG];

  return () => {
    allLogLevels
      .filter((level) => !(disabledLevels ?? defaultDisabledLevels).includes(level))
      .forEach((level) => {
        /* eslint-disable-next-line no-console */
        console[level] = (...args) => {
          try {
            agent.api.pushLog(args, { level });
          } catch (err) {
            // TODO: Add proper logging when debug is enabled
          } finally {
            agent.api.callOriginalConsoleMethod(level, ...args);
          }
        };
      });
  };
}

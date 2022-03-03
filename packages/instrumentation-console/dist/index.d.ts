import { LogLevel } from '@grafana/javascript-agent-core';
import type { Instrumentation } from '@grafana/javascript-agent-core';
export interface ConsoleInstrumentationOptions {
    disabledLevels?: LogLevel[];
}
export default function getConsoleInstrumentation({ disabledLevels, }?: ConsoleInstrumentationOptions): Instrumentation;

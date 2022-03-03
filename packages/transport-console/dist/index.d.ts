import { LogLevel } from '@grafana/javascript-agent-core';
import type { Transport } from '@grafana/javascript-agent-core';
export interface ConsoleTransportOptions {
    level?: LogLevel;
}
export default function getConsoleTransport({ level }?: ConsoleTransportOptions): Transport;

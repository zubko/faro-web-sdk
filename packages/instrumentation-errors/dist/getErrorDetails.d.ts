import type { ExceptionStackFrame } from '@grafana/javascript-agent-core';
declare type ErrorEvent = (Error | Event) & {
    error?: Error;
};
export declare function getErrorDetails(event: ErrorEvent): [string | undefined, string | undefined, ExceptionStackFrame[]];
export {};

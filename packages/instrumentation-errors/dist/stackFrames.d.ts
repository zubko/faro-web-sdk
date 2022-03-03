import type { ExceptionStackFrame } from '@grafana/javascript-agent-core';
import type { ExtendedError } from './extendedError';
export declare function getDataFromSafariExtensions(func: string | undefined, filename: string | undefined): [string | undefined, string | undefined];
export declare function buildStackFrame(filename: string | undefined, func: string | undefined, lineno: number | undefined, colno: number | undefined): ExceptionStackFrame;
export declare function getStackFramesFromError(error: ExtendedError): ExceptionStackFrame[];

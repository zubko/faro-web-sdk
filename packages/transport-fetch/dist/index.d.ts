import type { Transport } from '@grafana/javascript-agent-core';
export interface FetchTransportRequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
    headers?: Record<string, string>;
}
export interface FetchTransportOptions {
    url: string;
    debug?: boolean;
    requestOptions: FetchTransportRequestOptions;
}
export default function getFetchTransport(options: FetchTransportOptions): Transport;

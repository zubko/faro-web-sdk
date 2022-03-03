import type { Transport } from './types';
declare type FetchTransportOptions = Omit<RequestInit, 'body'> & {
    url: string;
    debug?: boolean;
};
export declare function getFetchTransport(options: FetchTransportOptions): Transport;
export {};

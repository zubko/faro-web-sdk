import { agent, getTransportBody, LogLevel, prefixAgentMessage } from '@grafana/agent-core';
import type { Transport } from '@grafana/agent-core';

const debugMessage = prefixAgentMessage('Failed sending payload to the receiver');

export interface FetchTransportRequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  headers?: Record<string, string>;
}

export interface FetchTransportOptions {
  url: string;

  debug?: boolean;
  requestOptions?: FetchTransportRequestOptions;
}

export default function getFetchTransport({ debug, requestOptions, url }: FetchTransportOptions): Transport {
  const { headers, ...restOfRequestOptions } = requestOptions ?? {};

  return async (item) => {
    try {
      const body = JSON.stringify(getTransportBody(item));

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(headers ?? {}),
        },
        body,
        keepalive: true,
        ...(restOfRequestOptions ?? {}),
      });
    } catch (err) {
      if (debug) {
        agent.api.callOriginalConsoleMethod(LogLevel.DEBUG, debugMessage, err);
      }
    }
  };
}

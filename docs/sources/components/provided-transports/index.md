---
title: Provided transports
menuTitle: Transports
description: An in-depth explanation of the provided transports and how to use them.
aliases:
  - /docs/grafana-cloud/faro-web-sdk/faro-web-sdk-components/provided-transports/
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/components/provided-transports/
weight: 200
keywords:
  - transport
  - console transport
  - fetch transport
---

# Provided transports

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

Transports are data processors that submit the data collected by Faro Web SDK.

For example, a transport can use the `fetch` API to send the data to a remote server or it can use the `console` API to display the data in the browser console.

By default, the core package of the Grafana Faro Web SDK does include any transports, but they are provided in specific packages for the platform you are using.

## Fetch

The fetch transport uses the `fetch` API to send the data to a remote endpoint.

{{% admonition type="note" %}}
Similar to the `sendBeacon` API, the requests are kept alive after the page is closed.
{{% /admonition %}}

The Grafana Faro Web SDK uses the fetch transport, by default. You can elect not to use it when developing or during testing sessions.

### How to use the fetch transport

You can use the fetch transport in two ways.

The first approach is to provide the URL of the endpoint and the API key that you get from Grafana Cloud.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
});
```

Alternatively, if you want to enable another transport at the same time or you want to configure the fetch transport, you must overwrite the `transports` array when you initialize the Grafana Faro Web SDK.

```ts
initializeFaro({
  app: {
    name: 'my-app',
  },
  transports: [
    new FetchTransport({
      url: 'http://my-endpoint:1234/collect/{app-key}',

      // Optional, if your receiver requires an API key
      apiKey: 'my-api-key',

      // Optional, if you want to customize how many requests to buffer
      bufferSize: 10,

      // Optional, if you want to customize how many requests to run in parallel
      concurrency: 5,

      // Optional, if you want to customize how long to wait before trying to resend the data
      defaultRateLimitBackoffMs: 1000,

      // Optional, if you want to customize the fetch options
      requestOptions: {
        headers: {
          'My-Header': 'My Header Value',
        },
      },
    }),
  ],
});
```

## Console

The console transport uses the browser's `console.log` API to display the data in the browser console.

This transport is useful in the following situations:

- When you are developing and want to debug what the Grafana Faro Web SDK sends to the remote server
- When you are testing and don't have a remote server to send the data to

### How to use the console transport

In order to enable the console transport, you must overwrite the `transports` array when you initialize the Grafana Faro Web SDK.

```ts
initializeFaro({
  app: {
    name: 'my-app',
  },
  transports: [
    new ConsoleTransport({
      // Optional, if you want to print the messages using console.debug instead of console.log
      level: LogLevel.DEBUG,
    }),
  ],
});
```

{{% admonition type="note" %}}
Defining the `transports` array also disables the fetch transport that is used by default. You need to add it to the array if you want to use it along with the console transport.
{{ /admonition }}


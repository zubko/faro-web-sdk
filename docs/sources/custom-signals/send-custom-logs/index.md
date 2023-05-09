---
title: Send custom logs
menuTitle: Send custom logs
description: Use Faro Web SDK to send custom logs
aliases:
  - /docs/grafana-cloud/faro-web-sdk/custom-signals/send-custom-logs
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/custom-signals/send-custom-logs
weight: 700
keywords:
  - logs
  - telemetry
---

# Send custom logs

Logs are an integral part of instrumenting your application.
Initializing the Faro Web SDK will hook into the browser's `console` object and send`info`s, `warn`s and `error`s to the collector endpoint.
To learn more about how the console instrumentation works, refer to [Instrumentations]({{< relref "../../faro-web-sdk-components/provided-instrumentations/#console" >}}).

This will cover a large subset of your troubleshooting experience, but you can log any message based on your application requirements.

The logs sent to the collector endpoint are ingested by the Grafana Logs instance.
If you are not already familiar with it, refer to the [Loki Documentation](/docs/loki/latest/fundamentals/labels/).

## Before you begin

- Ensure you have registered your app in the Frontend Observability plugin
- Initialize the Faro Web SDK as described in the [Get started with Grafana Cloud Frontend Observability]({{< relref "../../../_index.md" >}})

## Steps

A Faro instance is an object that can be accessed, after initialization, by either importing it from the `@grafana/faro-web-sdk` or by referencing it from the `window` global object.

```typescript
// Import the global faro instance
import { faro } from '@grafana/faro-web-sdk';
```

The `faro.api` object is a wrapper of the Faro API and provides a
[`pushLog`](https://github.com/grafana/faro-web-sdk/tree/main/packages/core#logs) method with which you can send any number of logs with a set of options.

```typescript
// Send custom logs with Faro SDK
// 1. Simple log line with default level
// 2. Log line with explicit level

// Send a single log
faro.api.pushLog(['User clicked add to cart']);

// Send a log with a fixed level
faro.api.pushLog([`App memory usage ${somePerf.memUsage}`], {
  level: LogLevel.WARN,
});
```

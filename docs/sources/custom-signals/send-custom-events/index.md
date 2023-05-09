---
title: Send custom events
menuTitle: Send custom events
description: Use Faro Web SDK to send custom events
aliases:
  - /docs/grafana-cloud/faro-web-sdk/custom-signals/send-custom-events
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/custom-signals/send-custom-events
weight: 700
keywords:
  - events
  - telemetry
---

# Send custom events

Faro correlates multiple data points such as logs, measurements, traces, and exceptions, to provide insights into how users interact with your web application.
This is a very powerful tool when you want to identify user experience bottlenecks with context-rich data from across the stack.

Although integrating the Faro Web SDK in your application provides auto instrumentation, there are cases where you might want to track user behaviour by sending events during a session (for example, when a user clicks a button.
The SDK includes an event API that can send any event.

The events sent to the collector endpoint are ingested by a Loki instance as logs with a specific label `kind=event`.
For more information about Loki labels, refer to [Labels](/docs/loki/latest/fundamentals/labels/).

## Before you begin

- Ensure you have registered your app in the Frontend Observability plugin
- Initialize the Faro Web SDK as described in the [Get started with Grafana Cloud Frontend Observability]({{< relref "../../../get-started/" >}})

## Steps

A Faro instance is an object that can be accessed, after initialization, by either importing it from the `@grafana/faro-web-sdk` or by referencing it from the `window` global object.

```typescript
// Import the global faro instance
import { faro } from '@grafana/faro-web-sdk';
```

The `faro.api` object is a wrapper of the Faro API and provides a [`pushEvent`](https://github.com/grafana/faro-web-sdk/tree/main/packages/core#events) method with which you can send any event.
You can also provide optional event metadata and a domain that is used to group events.

```typescript
// Send custom events with Faro SDK.
// 1. Send a simple, string based event
// 2. Send an event with enriched context

// Simple usecase
faro.api.pushEvent('user clicked add-to-cart');

// Context rich usecase
faro.api.pushEvent(
  'user clicked add-to-cart',
  {
    cartLength: 5,
  },
  'checkout'
);
```

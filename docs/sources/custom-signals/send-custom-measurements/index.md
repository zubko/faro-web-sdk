---
title: Send custom measurements
menuTitle: Send custom measurements
description: Use Faro Web SDK to send custom measurements
aliases:
  - /docs/grafana-cloud/faro-web-sdk/custom-signals/send-custom-measurements
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/custom-signals/send-custom-measurements
weight: 700
keywords:
  - measurements
  - telemetry
---

# Send custom measurements

Faro Web SDK exposes some performance measurements, but there are cases where you might need to send application-specific data.
For example, you might want to report some internals of the JavaScript framework you are using, or the time that it was elapsed before a user completed a form.
The SDK comes with a simple API to do so.

## Before you begin

- Ensure you have registered your app in the Frontend Observability plugin
- Initialize the Faro Web SDK as described in the [Get started with Grafana Cloud Frontend Observability]({{< relref "../../../_index.md" >}})

## Steps

Faro instance is an object that can be accessed, after initialization, by either importing it from the `@grafana/faro-web-sdk` or by referencing it from the `window` global object.

```typescript
// Import the global faro instance
import { faro } from '@grafana/faro-web-sdk';
```

The `faro.api` object is a wrapper of the Faro API and provides a [`pushMeasurement`](https://github.com/grafana/faro-web-sdk/tree/main/packages/core#measurements)method with which you can send any number of number values.

```typescript
// Send custom measurements with Faro SDK.
// This example reports some hypothetical measurements from the JavaScript
// framework the application is using.

faro.api.pushMeasurement({
  type: 'internal_framework_measurements',
  values: {
    root_render_ms: 142.3,
    memory_used: 286,
  },
});
```

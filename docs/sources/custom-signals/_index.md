---
title: Send custom signals with Faro SDK
menuTitle: Send custom signals
description: Learn how to extend Faro's SDK to incorporate your signals (measurements, logs, events, exceptions).
aliases:
  - /docs/grafana-cloud/faro-web-sdk/custom-signals
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/custom-signals
weight: 300
keywords:
  - logs
  - measurements
  - telemetry
---

# Send custom signals with Faro SDK

After you add it to your application, Faro Web SDK sends the following signals to the collector endpoint:

- Unhandled errors and rejections
- [Web Vitals](https://web.dev/vitals) performance measurements
- Logs committed through the `console` object

Although the default signals address many use cases, you might need to manually capture some errors, send custom measurements from your application, integrate log transportation into your logging mechanism, and so on. The following topics address how to use Faro Web SDK to:

- [Send custom errors]({{< relref "./send-custom-errors" >}})
- [Send custom measurements]({{< relref "./send-custom-measurements" >}})
- [Send custom logs]({{< relref "./send-custom-logs" >}})
- [Send custom events]({{< relref "./send-custom-events" >}})

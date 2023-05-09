---
aliases:
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/
description: Learn about the Grafana Faro Web SDK and how it works.
title: Grafana Faro Web SDK
weight: 1470
menuTitle: Faro Web SDK
keywords:
  - rum
  - frontend monitoring
  - real user monitoring
  - browser monitoring
  - browser metrics
---

# Grafana Faro Web SDK

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

Grafana Faro Web SDK is a library that instruments browser frontend applications in order to capture observability signals and send it to Grafana Cloud.
You can use it to monitor web application performance, discover frontend errors and track user behavior to ease failure resolution. The collected frontend observability data can be
correlated with backend & infrastructure data for seamless, full-stack observability.

- **Automatic error tracking:** Grafana Faro Web SDK automatically captures unhandled errors and rejected promises for further analysis in Grafana Cloud. Compiled stack trace locations are transformed to original source locations. Use this to discover & troubleshoot problems within the original source code context.

- **Web application performance monitoring:** Grafana Faro Web SDK automatically captures [Web Vitals metrics](https://web.dev/vitals), providing insights into user-perceived performance,
  interactivity and visual stability of a web application.

- **Full stack tracing:** Grafana Faro Web SDK can integrate with [OpenTelemetry's](https://opentelemetry.io/) [JavaScript library](https://github.com/open-telemetry/opentelemetry-js) to capture frontend activity as traces and propagate tracing context to enable tight correlation with backend transactions.
  Combined with tracing in your service layer, it creates a big picture of the causes and the effects of user interaction in your web application and the backend services.

- **Frontend logs:** Grafana Faro Web SDK will automatically capture logs when using the global `window.console` object. It can be integrated with your logging framework and logs can be pushed programmatically.
  Use frontend logs to gain additional context into errors & user activities and the state of your application.

- **User activity tracking:** Use the Grafana Faro Web SDK to capture user sessions and key events. Track feature usage, user journeys, KPIs.

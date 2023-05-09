---
title: Grafana Faro Web SDK architecture
menuTitle: Architecture
description: Learn more about how the Grafana Faro Web SDK works
aliases:
  - /docs/grafana-cloud/faro-web-sdk/faro-web-sdk-components/
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/components/
weight: 100
keywords:
  - overview
  - architecture
  - components
---

# Grafana Faro Web SDK architecture

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

This topic provides an overview of how the Grafana Faro Web SDK collects observability data and how that data is ingested into Grafana Cloud.

![Faro Web SDK architecture](/static/assets/img/diagrams/grafana-cloud-faro-diagram.png)

### Grafana Faro Web SDK

The Grafana Faro Web SDK is a highly configurable JavaScript library that can be embedded in web applications to collect performance metrics, logs, exceptions, events and traces
which are then forwarded to the collector endpoint in Grafana Cloud. In addition to multiple automatic instrumentation capabilities, Faro also offers manual instrumentation capability.

### Grafana Cloud Collector Endpoint

Grafana Cloud Collector Endpoint receives data from the Grafana Faro Web SDK, applies processing such as stack trace transformation, and forwards the data to the appropriate logs and traces backends in Grafana Cloud. The collector endpoint applies aggressive rate limiting to prevent abuse or accidental overages. Rate-limited data is currently dropped.

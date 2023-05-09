---
menuTitle: Integrate OpenTelemetry-JS tracing
title: Integrate OpenTelemetry-JS tracing
description: Learn how to use OpenTelemetry-JS-based tracing with Faro.
aliases:
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/opentelemetry-js
  - /docs/grafana-cloud/faro-web-sdk/opentelemetry-js
weight: 200
keywords:
  - faro
  - opentelemetry
  - tracing
---

# Integrate OpenTelemetry-JS tracing

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

[Tracing](/docs/tempo/latest/getting-started/traces/) is a mechanism to record paths taken by requests as they propagate through multiple services, for example, from front end app to back-end service to database. Although Faro does not have its own tracing implementation, it can be integrated with [OpenTelemetry-JS](https://opentelemetry.io/docs/instrumentation/js/) to capture tracing data, send it to Grafana Cloud and automatically add tracing context to captured logs, exceptions, events, and measurements.

There are two ways to integrate OpenTelemetry-JS tracing with Faro. If you do not have OpenTelemetry-JS set up in your application, you can use Faro web tracing instrumentation which sets it up for you. If you already have OpenTelemetry-JS, you can configure it to export traces via Faro Web SDK.

## Before you begin

Because the OpenTelemetry-JS packages are large, they are not included in the core or web packages of Grafana Faro Web SDK. You must manually install the Faro tracing package.

Run one of the following commands, depending on your package manager. The command installs the tracing package in your project.

```shell
# Using npm
npm install @grafana/faro-web-tracing

# Using yarn
yarn add @grafana/faro-web-tracing

# Using pnpm
pnpm add @grafana/faro-web-tracing
```

## Set up OpenTelemetry-JS tracing via Faro instrumentation

If your application does not have OpenTelemetry-JS, you can use `TracingInstrumentation` included with the Faro web tracing package.

The following commands add OpenTelemetry-JS tracing to the list of instrumentations executed when you initialize Faro. These commands initialize OpenTelemetry tracing with document load, fetch, XHR, and user interaction auto-instrumentations.

Note:<br/>
To have tracing headers added for CORS requests, you need to define the URLs that should include trace headers.
This is done with the `propagateTraceHeaderCorsUrls` property, which is a list of string or Regex patterns.

```ts
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

initializeFaro({
  // Mandatory, the URL of the Grafana Cloud collector with embedded application key.
  // Copy from the configuration page of your application in Grafana.
  url: 'http://faro-collector-us-central-0.grafana.net/collect/{app-key}',

  // Mandatory, the identification label(s) of your application
  app: {
    name: 'my-app',
    version: '1.0.0', // Optional, but recommended
  },

  instrumentations: [
    // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
    ...getWebInstrumentations(),

    // Mandatory, initialization of the tracing package
    new TracingInstrumentation({
      instrumentationOptions: {
        // Requests to these URLs will have tracing headers attached.
        propagateTraceHeaderCorsUrls: [new RegExp('https://foo.com/*'), 'https://bar.com'],
      },
    }),
  ],
});
```

## Integrate existing OpenTelemetry-JS instrumentation with Faro Web SDK

If you already have OpenTelemetry-JS set up in your application, you can integrate it with Faro Web SDK by adding `FaroSessionSpanProcessor` to add Faro session id to spans, `FaroTraceExporter` to export spans via Faro and registers OpenTelemetry API with the Faro Web SDK instance.

Note:<br/>
To add tracing headers for CORS requests, you need to define the URLs that should include the trace headers.

This can be done using the `propagateTraceHeaderCorsUrls` property, which is a list of string or Regex patterns.

```ts
import { trace, context } from '@opentelemetry/api';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { FaroTraceExporter, FaroSessionSpanProcessor } from '@grafana/faro-web-tracing';
// ...
// initialize Faro Web SDK
const faro = initializeFaro({
  /* ... */
});
// setup OpenTelemetry provider
const provider = new WebTracerProvider({
  /* ... */
});
// ...
// set up span processors and Faro trace exporer
provider.addSpanProcessor(
  new FaroSessionSpanProcessor(new BatchSpanProcessor(new FaroTraceExporter({ ...faro }))),
  // The Faro metas object which for example contains the Session Meta with the configured sessionId.
  faro.metas
);
// ...
// register OpenTelemetry API with Faro Web SDK instance
faro.api.initOTEL(trace, context);
```

You can find a complete example [here](https://github.com/grafana/faro-web-sdk/blob/main/docs/sources/tutorials/quick-start-browser.md#with-custom-open-telemetry-tracing-configuration).

## Example of starting a trace

The following example shows you how to start a trace.

```ts
const { trace, context } = faro.api.getOTEL();

const tracer = trace.getTracer('default');
const span = tracer.startSpan('click');

context.with(trace.setSpan(context.active(), span), () => {
  doSomething();
  span.end();
});
```

---
title: Provided instrumentations
menuTitle: Instrumentations
description: An in-depth explanation of the provided instrumentations and how to use them.
aliases:
  - /docs/grafana-cloud/faro-web-sdk/faro-web-sdk-components/provided-instrumentations
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/components/provided-instrumentations/
weight: 100
keywords:
  - instrumentation
  - console capturing
  - error catching
  - tracing
  - session tracking
  - view tracking
---

# Provided instrumentations

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

Instrumentations are data collectors responsible for integrating with the platform, such as a browser API, to collect and parse data and use the Grafana Faro Web SDK core API to report it.

For example, an instrumentation replaces the browser's console with a custom implementation that collects all the logs and reports them to the Grafana Faro Web SDK core API using the `faro.api.pushLog()` function.

By default, the core package of the Grafana Faro Web SDK does not include instrumentations. Instead, they are provided in specific packages for the platform you are using (except for browser tracing instrumentation - see below).

## Console

Logs are critical for troubleshooting errors because they provide context and detail into what is happening in your application.

The console instrumentation replaces the browser's console with a custom implementation that collects all logs, so whenever `console.error` (for example) is called, the message is sent as a log to the collector.

Console instrumentation helps you to:

- Determine the context and the root cause of errors
- Capture messages emitted by the application or the libraries it uses
- Monitor your application and determine that it is working as expected

Because the console instrumentation can offer helpful context when you troubleshoot errors, we recommend that you keep this instrumentation enabled. However, enabling log collection for all log levels captures a lot of data that is sent to Grafana Cloud which can increase cost and result in verbose data.

By default, the following log levels are disabled and we recommend that you only enable them if required:

- `console.debug`
- `console.trace`
- `console.log`

### How to use the console instrumentation

The following console instrumentation is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `instrumentations` array when you initialize the Grafana Faro Web SDK, you must manually include the console instrumentation.
{{% /admonition %}}

To manually include the console instrumentation, use the following `getWebInstrumentations` helper function.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [
    ...getWebInstrumentations({
      // Optional, if you want to disable the console instrumentation
      captureConsole: false,

      // Optional, if you want to collect all levels
      captureConsoleDisabledLevels: [],

      // Optional, if you want to disable only some levels
      captureConsoleDisabledLevels: [LogLevel.DEBUG, LogLevel.TRACE],
    }),
  ],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the `ConsoleInstrumentation` class.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [
    new ConsoleInstrumentation({
      // Optional, if you want to collect all levels
      disabledLevels: [],

      // Optional, if you want to disable only some levels
      disabledLevels: [LogLevel.DEBUG, LogLevel.TRACE],
    }),
  ],
});
```

## Error

Applications can sometimes produce errors, but because they run in a browser, developers are unaware that they are occurring. In addition, users do not always report errors, which adds to the complexity of troubleshooting them.

The error instrumentation subscribes to the browser's `window.onerror` and `onunhandledrejection` events to collect them, extract the stacktrace if available, and report them to the Grafana Faro Web SDK core API using the `faro.api.pushError()` function.

Tracking errors helps you to:

- Analyze anomalies that occur in your application (crashes, incorrect behaviour etc.)
- Monitor that your application is working as expected
- Detect issues with external systems that your application is using

The error instrumentation should always be enabled as it is the only way to automatically capture errors. You can, however, disable this instrumentation if you are tracking errors by other means.

> **Note:** When an error is caught in a `try/catch` block, the error needs to be re-thrown or reported manually.

```ts
const buggyFn = () => {
  throw new Error('Buggy function');
};

try {
  buggyFn();
} catch (err) {
  // Re-throw the error so it can be caught by the instrumentation
  throw err;

  // Alternatively, report it manually
  faro.api.pushError(err);
}
```

### How to use the error instrumentation

The following error instrumentation is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `instrumentations` array when you initialize the Grafana Faro Web SDK, you must manually include the error instrumentation.
{{% /admonition %}}

To manually include the error instrumentation, use the following `getWebInstrumentations` helper function.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [...getWebInstrumentations()],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the following `ErrorInstrumentation` class.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [new ErrorsInstrumentation()],
});
```

## Web Vitals

[Web Vitals](https://web.dev/vitals/) measure the real-world performance of your site so that developers, site owners, and others can improve it. For more information about Web Vitals, refer to [web.dev](https://web.dev/vitals/).

The Web Vitals instrumentation uses the [web-vitals](https://github.com/GoogleChrome/web-vitals) package to collect and report data.

Tracking Web Vitals helps you to:

- Analyze the loading times of your pages
- Detect large repaints that take a lot of time
- Detect delays until first inputs from your users

### How to use the Web Vitals instrumentation

The following Web Vitals instrumentation is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

> **Note: ** If you overwrite the `instrumentations` array when you initialize the Grafana Faro Web SDK, you must manually include the Web Vitals instrumentation.

To manually include the Web Vitals instrumentation, use the following `getWebInstrumentations` helper function.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [...getWebInstrumentations()],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the following `WebVitalsInstrumentation` class.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [new WebVitalsInstrumentation()],
});
```

## Session tracking

The session tracking instrumentation reports the change of the `session` meta as an event. This is useful for RUM because you can track when a new session starts.

For example, if your application defines a session as the time between login and logout events, the session tracking instrumentation works as follows:

- When the user accesses the application, a session starts
- After the user logs in, another session starts
- When the user logs out, the session changes again

Using the session tracking instrumentation, you can correlate errors, logs, and events that occurred for a particular user during a single session using the application.

In order for the session tracking instrumentation to work correctly, the `session` meta should be set accordingly.

### How to use the session tracking instrumentation

The following session tracking instrumentation is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `instrumentations` array when you initialize the Grafana Faro Web SDK, you must manually include the Session tracking instrumentation.
{{% /admonition %}}

To manually include the session instrumentation, use the following `getWebInstrumentations` helper function.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [...getWebInstrumentations()],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the following `SessionInstrumentation` class.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [new SessionInstrumentation()],
});
```

## View tracking

{{% admonition type="note" %}}
The view tracking instrumentation is available as of Grafana Faro Web SDK version 1.0.0-beta6.
{{% /admonition %}}

The view tracking instrumentation reports the change of the `view` meta as an event. This is useful for RUM because you can track when a new view is set.

For example, you can set the following different views for an application:

- The register and login pages can be considered `auth` views
- The homepage page can be considered a `home` view
- The users listing and user profile pages can be seen as `users` views

Using the view tracking instrumentation, you can correlate errors, logs, and events that occurred for a particular user when using a particular section of the application.

In order for the view tracking instrumentation to work correctly, the `view` meta should be set accordingly.

### How to use the view tracking instrumentation

The following view tracking instrumentation is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `instrumentations` array when you initialize the Grafana Faro Web SDK, you must manually include the View tracking instrumentation.
{{% /admonition %}}

To manually include the view instrumentation, use the following `getWebInstrumentations` helper function.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [...getWebInstrumentations()],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the following `ViewInstrumentation` class.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [new ViewInstrumentation()],
});
```

## Tracing

Tracing collects and reports a detailed view of what occurs each time a user interacts with an application. Because tracing captures an application's flow and data progression, it yields a considerable amount of data.

The tracing instrumentation performs analysis on the browser of your application. It relies on [OpenTelemetry](https://opentelemetry.io/) to collect the data and it is leverages the `faro.api.pushTraces()` function to report it.

For example, if you have an application with a front end that calls an API that stores data in a database, you can use the tracing instrumentation to:

- Track what happens in your application when the user clicks a button, which APIs are called, how much time is spent on the request, and so on.
- Associate actions that occur in the frontend of your application with actions that occur in the API of your application
- Determine the amount of time spent on specific HTTP requests and the amount of time spent on different events of an HTTP request, for example, domain lookup and so on.

Because tracing produces a lot of data and can compromise application performance, we recommend that you enable it in a production environment only when you need it. You can also enable tracing in a testing environment, or when you want to fine-tune the OpenTelemetry instrumentations.

Do not use tracing:

- If you don't have a good reason to enable it.
- If your application has an instrumented API. In this case, you can also disable only the `fetch` tracing instrumentation.
- If you are not interested in tracing the user interactions, for example, clicks. In this case, you can also disable only the user interaction instrumentation.

By default, tracing uses the following OpenTelemetry instrumentations:

- [`@opentelemetry/instrumentation-document-load`](https://www.npmjs.com/package/@opentelemetry/instrumentation-document-load)
- [`@opentelemetry/instrumentation-fetch`](https://www.npmjs.com/package/@opentelemetry/instrumentation-fetch)
- [`@opentelemetry/instrumentation-user-interaction`](https://www.npmjs.com/package/@opentelemetry/instrumentation-user-interaction)
- [`@opentelemetry/instrumentation-xml-http-request`](https://www.npmjs.com/package/@opentelemetry/instrumentation-xml-http-request)

{{% admonition type="note" %}}
To link the traces from the front end with the traces from the API, the tracing instrumentation relies on a trace propagator, which by default uses `W3CTraceContextPropagator`. This propagator adds a `traceparent` header to all fetch requests which is then used by your API.
{{% /admonition %}}

### How to use the tracing instrumentation

The following tracing instrumentation is not enabled by default. You must manually enable it.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  instrumentations: [
    // Other instrumentations

    // Don't forget to add the other instrumentations as well
    ...getWebInstrumentations(),

    new TracingInstrumentation({
      // Optional, if you want to add custom attributes to the resource
      resourceAttributes: {
        'my.attribute': 'my-attribute-value',
      },

      // Optional, if you want to replace the default W3C Trace Context Propagator
      propagator: new MyPropagator(),

      // Optional, if you want to overwrite the default Zone Context Manager
      contextManager: new MyContextManager(),

      // Optional, if you want to overwrite the default instrumentations or set ignore URLs
      instrumentations: [
        ...getDefaultOTELInstrumentations({
          // URLs defined here are ignored by the HTTP requests instrumentations
          ignoreUrls: [/localhost:3000/],
        }),

        new MyOtherOTELInstrumentation(),
      ],
    }),
  ],
});
```

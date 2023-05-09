---
menuTitle: FAQ Faro Web-SDK
title: FAQ Faro Web-SDK
description: Find answers to common Faro Web-SDK questions.
aliases:
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/faq
  - /docs/grafana-cloud/faro-web-sdk/faq
weight: 400
keywords:
  - faro
  - faq
---

# Faro Web-SDK FAQ

## How does Faro collect errors?

We register two error handlers:

- `onError`: to catch unhandled exceptions. The Faro data model for errors is a structured format containing the line number of the script file where the error occurred.
- `onunhandledrejection` to catch errors from rejected JavaScript Promises which don not have rejection handlers attached.

## Why am I seeing script error instead of a full stacktrace?

When errors happen in third-party scripts, we can not get the stack trace information because browsers
restrict access for security reasons. Browsers will replace the contents of errors with a generic "Script Error." message.

If your trust the resources, you can instruct browsers to reveal the error messages of third-party scripts.

1. Add `crossorigin="anonymous"` to the respective script tags. This will instruct the browser to set mode to `cors` and the credentials mode to `same-origin` for that specific request.
2. The HTTP response which delivers the script to the client needs to have the `Access-Control-Allow-Origin` header set.

HTML File:

```html
<!-- https://mysite.com:443 -->
<script src="http://mysite.com/myscript.js" crossorigin="anonymous"></script>
```

Server:

```
Access-Control-Allow-Origin: https://mysite.com:443
```

## Does the Faro SDK have a sampling capability to rate limit the telemetry data sent to grafana Cloud?

The Faro Web-SDK does not have a sampling mechanism out of the box yet but there is a workaround for it.
In order to control the amount of data that is sent to the receiver, clients can use the `beforeSend` hook that is offered by the library.

Example: Sample EVERYTHING at a 50% rate.

Note: Harsh dropping of 50 % of signals may result in an incomplete picture for analysis.

```ts
initializeFaro({
  // ... faro configuration
  beforeSend: (item) => {
    if (Math.random() < 0.5) {
      return null;
    }

    return item;
  }
```

You can have more control over it. For example if you want to handle signal types differently.

Example: only sample Logs at a 50% rate.

```ts
initializeFaro({
  // ... faro configuration
  beforeSend: (item) => {
    switch (item.type) {
      // always send errors and RUM events
      case 'exception':
      case 'event':
      case 'traces':
      case 'measurement':
        return item;

      // send only half of the logs
      case 'log':
        return Math.random() < 0.5 ? item : null;
    }
  }
```

## Does Faro deduplicate Events?

To reduce data usage Faro deduplicates events. Means if two similar events are emitted consecutively, Faro only sends the event once.

## How can I Instrument composable frontends?

You can use independent Faro instances per frontend. Simply initialize a Faro instance per microfrontend you want to instrument by setting the `isolate` property to true. This tells the local Faro instance to not use the global instance APIs.

Example:\
Initialize a global Faro instance to capture everything which you want to capture for the global scope.
Additionally you initialize a Faro instance per sub-frontend (with `isolate=true`) to capture only the desired events for the local scope. To reduce the bundle size you may want to only add the instrumentations you need and let the global instance capture everything else.

To filter sources which shall not be captured by the global app you may want to use the `onBeforeSend()` hook on the global instance. For example if you also want to capture errors on the sub-frontend level. Then on the global instance you can filter out those events which are related to the specific sub-fronted only.

Example\

```ts
onBeforeSend():
  beforeSend: (item) => {
    const isException = item.type === 'exception'

    if (isException && !(event.meta.page?.url ?? '').includes('foo')) {
      return null;
    }

    return event;
}
```

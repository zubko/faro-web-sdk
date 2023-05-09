---
title: Provided metas
menuTitle: Metas
description: An in-depth explanation of the provided metas and how to use them.
aliases:
  - /docs/grafana-cloud/faro-web-sdk/faro-web-sdk-components/provided-metas/
  - /docs/grafana-cloud/frontend-observability/faro-web-sdk/components/provided-metas/
weight: 300
keywords:
  - meta
  - app meta
  - user meta
  - session meta
  - page meta
  - browser meta
  - view meta
---

# Provided metas

> The Grafana Faro Web SDK powers the fully managed Grafana Cloud Frontend Observability service in Grafana Cloud, which is currently in [public preview](https://grafana.com/docs/release-life-cycle/).

Metas are additional data that accompany the errors, events, etc. that an instrumentation collects. Metas are useful because they provide additional context and enable you to filter the data and extract it only for a particular user, session, browser etc.

For example, when you need to associate the collected data with your application, you provide the application name as a meta and, optionally, the application version and the environment where it runs.

## App

The app meta is mandatory and associates the collected data with your application.

The app meta contains three fields that you can set:

- `name` (required): The name of your application
- `version` (optional): The application version, for example, `1.0.0`
- `environment` (optional): The environment where your application is running, for example `production`

The `version` and `environment` fields are optional, but we recommend using them because:

- They provide another set of labels that you can use to filter data
- They help you determine when an error was introduced, for example, version `1.0.1` produces the error but version `1.0.0` doesn't
- You can check error rates between application versions and environments
- You can identify problematic containers, for example, the application served from container `X` takes more time to serve a page

### How to use the app meta

In order to set the following app meta, you must provide at least the `name` field when you initialize the Grafana Faro Web SDK.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    // You must provide at least the name field!
    name: 'my-app',

    // Optional, if you want to specify an app version
    version: '1.0.0',

    // Optional, if you want to specify the environment where the app is running
    environment: 'production',
  },
});
```

## Session

The session meta is an optional meta that associates the collected data with the current session. A session is defined by a single access of a web page, and it is persisted across the entire page lifetime for Single Page Applications (SPAs).

You don't need to manually set the session during initialization because it is automatically set by the Grafana Faro Web SDK. However, you can manually set it if you want to control the session ID. For example, manually set the session when you want to set a custom session ID or want to access the session ID for other purposes.

### How to use the session meta

The following session meta is enabled by default. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

Alternatively, you can pass a session object created using the `createSession` helper function. This is useful when you want control over the session object (for example, you want to display the session ID somewhere).

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  session: createSession({
    // Optional, if you want to set custom attributes
    'my-custom-attribute': 'my-custom-attribute-value',
  }),
});
```

If your session ID is received from an external system or you want to create a session ID manually, you can define the session meta as an object.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  session: {
    id: `my-custom-id-${Math.random()}`,

    // Optional, if you want to set custom attributes
    attributes: {
      'my-custom-attribute': 'my-custom-attribute-value',
    },
  },
});
```

If you want to manually update the session meta dynamically after Faro Web SDK was initialized, you can use the `setSession` function. The payload can be either a session object created using the `createSession` helper function or a session object described above.

```ts
faro.api.setSession(createSession());
```

## User

The user meta is an optional meta that links the collected data with the current user. This is useful when you want to connect events to the user who performed them. In conjunction with the session meta, events that occurred prior to the user's login can be associated with the user once they log in.

Although optional, the user meta is useful in the following use cases:

- The application you are instrumenting has an authentication system
- You want to associate the collected data with the user who performed the operations
- You are not concerned about GDPR regulations

### How to use the user meta

The easiest way to set the user meta is to define it when you initialize the Grafana Faro Web SDK.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  user: {
    // Optional, if you want to pass the user ID
    id: '744072d1-5dc6-4442-aabb-0c2f6f28e81c',

    // Optional, if you want to pass the user email
    email: 'my-email@my-domain.my-tld',

    // Optional, if you want to pass the username
    username: 'my-user',

    // Optional, if you want to set custom attributes
    attributes: {
      'my-custom-attribute': 'my-custom-attribute-value',
    },
  },
});
```

There might be cases when the user details are not available upon initialization, (for example, the user is not yet logged in). In this case, you can use the following `setUser` function to set the user.

```ts
faro.api.setUser({
  // Optional, if you want to pass the user ID
  id: '744072d1-5dc6-4442-aabb-0c2f6f28e81c',

  // Optional, if you want to pass the user email
  email: 'my-email@my-domain.my-tld',

  // Optional, if you want to pass the username
  username: 'my-user',

  // Optional, if you want to set custom attributes
  attributes: {
    'my-custom-attribute': 'my-custom-attribute-value',
  },
});
```

## View

{{% admonition type="note" %}}
The view meta is available as of Grafana Faro Web SDK version 1.0.0-beta6.
{{% /admonition %}}

The view meta is an optional meta that associates the collected data with a view. A view can be seen as a way to categorize events, logs, etc., under a certain section of your application instead of relying only on URLs. For example, the register and login pages of your application can be in an "auth" view while the homepage can be in a "home" view.

By default, Grafana Faro Web SDK creates a "default" view which you can either override during initialization or manually update afterwards.

### How to use the view meta

The following view meta is enabled by default.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

However, you can set a view during initialization if you already know the view name. This is particularly useful for cases where users access your application using a page other than homepage.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  view: {
    name: 'auth',
  },
});
```

If you want to manually update the view meta dynamically after Faro Web SDK is initialized, you can use the `setView` function.

```ts
faro.api.setView({ name: 'auth' });
```

## Browser

The browser meta is an optional meta that attaches information about the browser used to access the web page.

The following information is extracted from the browser's user-agent:

- `name`: The name of the browser
- `version`: The browser version
- `os`: The operating system where the browser is running
- `mobile`: A boolean flag that indicates if the browser is running on a mobile device

The browser meta is enabled by default. We don't recommend disabling it because:

- Browser statistics will no longer be available
- Troubleshooting browser, version, or OS errors becomes more difficult.

### How to use the browser meta

The following browser meta is automatically set by the Grafana Faro Web SDK during initialization. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `metas` array when you initialize the Grafana Faro JWeb SDK, you must manually include the browser meta.
{{% /admonition %}}

To manually include the browser meta, use the following `defaultMetas` array.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  metas: [...defaultMetas],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the `browserMeta` meta getter.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  metas: [browserMeta],
});
```

## Page

The page meta is an optional but useful meta that attaches the URL of the current page to all collected data.

Because the page meta is useful and comes with zero overhead, it is enabled by default. We recommend that don't disable the page meta.

### How to use the page meta

The following page meta is automatically set by the Grafana Faro Web SDK during initialization. No additional configuration is required.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
});
```

{{% admonition type="note" %}}
If you overwrite the `metas` array when you initialize the Grafana Faro Web SDK, you must manually include the page meta.
{{% /admonition %}}

To manually include the page meta, use the following `defaultMetas` array.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  metas: [...defaultMetas],
});
```

Alternatively, if you want to fine-tune which instrumentations are enabled, you can use the following `pageMeta` meta getter.

```ts
initializeFaro({
  url: 'https://my-domain.my-tld/collect/{app-key}',
  app: {
    name: 'my-app',
  },
  metas: [pageMeta],
});
```

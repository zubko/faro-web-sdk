import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';

import { XHRInstrumentation } from '@grafana/faro-instrumentation-xhr';
import {
  initializeFaro as coreInit,
  getWebInstrumentations,
  ReactIntegration,
  ReactRouterVersion,
} from '@grafana/faro-react';
import type { Faro } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import { env } from '../utils';

export function initializeFaro(): Faro {
  const faro = coreInit({
    url: `http://localhost:${env.faro.portAppReceiver}/collect`,
    apiKey: env.faro.apiKey,
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
      }),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: {
          version: ReactRouterVersion.V6,
          dependencies: {
            createRoutesFromChildren,
            matchRoutes,
            Routes,
            useLocation,
            useNavigationType,
          },
        },
      }),
      new XHRInstrumentation(),
    ],
    batching: {
      // Batching is enabled by default and there is normally no reason to disable it.
      // We did it in the demo so users can inspect each single requests sent due to certain interactions.
      enabled: false,
    },
    app: {
      name: env.client.packageName,
      version: env.package.version,
      environment: env.mode.name,
    },
  });

  faro.api.pushLog(['Faro was initialized']);

  return faro;
}

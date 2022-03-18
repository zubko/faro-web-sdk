import { initializeAgent } from '@grafana/agent-core';
import getConsoleInstrumentation from '@grafana/agent-instrumentation-console';
import errorsInstrumentation from '@grafana/agent-instrumentation-errors';
import webTracingInstrumentation from '@grafana/agent-instrumentation-tracing-web';
import webVitalsInstrumentation from '@grafana/agent-instrumentation-web-vitals';
import browserMeta from '@grafana/agent-meta-browser';
import pageMeta from '@grafana/agent-meta-page';
import getConsoleTransport from '@grafana/agent-transport-console';
import getFetchTransport from '@grafana/agent-transport-fetch';

const agent = initializeAgent({
  instrumentations: [
    getConsoleInstrumentation(),
    errorsInstrumentation,
    webTracingInstrumentation,
    webVitalsInstrumentation,
  ],
  metas: [browserMeta, pageMeta],
  transports: [
    getConsoleTransport(),
    getFetchTransport({
      url: 'http://localhost:8080/collect',
      debug: true,
      requestOptions: {
        headers: { 'x-api-key': 'my-api-key' },
      },
    }),
  ],
});

agent.api.pushLog(['Manual event from initialized agent']);

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

const provider = new WebTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

registerInstrumentations({
  instrumentations: [new DocumentLoadInstrumentation()],
});

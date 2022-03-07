import type { Instrumentation } from '@grafana/agent-core';
// import type { Instrumentation, Span } from '@grafana/agent-core';
// import { agent, SpanKind, SpanStatusCode } from '@grafana/agent-core';

// const asdf = (startDate: number, parentSpan: Span, shouldEnd = false) => {
//   const nav: PerformanceNavigationTiming | undefined = performance.getEntriesByType(
//     'navigation'
//   )[0] as PerformanceNavigationTiming;
//
//   if (nav) {
//     parentSpan.setName(nav.name);
//     parentSpan.setKind(SpanKind.CLIENT);
//     parentSpan.setStatus(SpanStatusCode.OK);
//
//     performance.getEntriesByType('resource').forEach((entry) => {
//       const span = agent.api.getNewSpan(entry.name, {
//         parentSpan,
//         startDate: startDate + entry.startTime,
//       });
//       span.setAttribute('random.number', Math.random());
//       span.setKind(SpanKind.CLIENT);
//       span.setStatus(SpanStatusCode.OK);
//       span.end(startDate + entry.startTime + entry.duration);
//       parentSpan.addChildSpan(span);
//     });
//   }
//
//   if (shouldEnd) {
//     parentSpan.end();
//     parentSpan.transport();
//   }
// };

const tracingInstrumentation: Instrumentation = () => {
  // const startDate = Date.now();
  // const span = agent.api.getNewSpan('new page');
  //
  // if (document.readyState === 'complete') {
  //   asdf(startDate, span);
  //   span.end();
  //   span.transport();
  // } else {
  //   window.addEventListener('load', () => asdf(startDate, span, true));
  // }
};

export default tracingInstrumentation;

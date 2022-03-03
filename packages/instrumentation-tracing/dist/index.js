import { agent } from '@grafana/javascript-agent-core';
var tracingInstrumentation = function () {
    agent.api.pushLog(['A simple log from the tracing instrumentation package']);
};
export default tracingInstrumentation;
//# sourceMappingURL=index.js.map
import { agent, isPrimitive } from '@grafana/javascript-agent-core';
import { primitiveUnhandledType, primitiveUnhandledValue } from './const';
import { getErrorDetails } from './getErrorDetails';
export function registerOnunhandledrejection() {
    window.addEventListener('unhandledrejection', function (event) {
        var _a;
        var _b, _c;
        var error = event;
        if (error.reason) {
            error = event.reason;
        }
        else if ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.reason) {
            error = (_c = event.detail) === null || _c === void 0 ? void 0 : _c.reason;
        }
        var value;
        var type;
        if (isPrimitive(error)) {
            value = "".concat(primitiveUnhandledValue, " ").concat(String(error));
            type = primitiveUnhandledType;
        }
        else {
            _a = getErrorDetails(error), value = _a[0], type = _a[1];
        }
        if (value) {
            agent.api.pushException(value, type);
        }
    });
}
//# sourceMappingURL=registerOnunhandledrejection.js.map
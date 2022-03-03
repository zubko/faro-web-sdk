import { agent, isString } from '@grafana/javascript-agent-core';
import { unknownString } from './const';
import { getErrorDetails } from './getErrorDetails';
import { getValueAndTypeFromMessage } from './getValueAndTypeFromMessage';
import { buildStackFrame } from './stackFrames';
export function registerOnerror() {
    // The error event is a little bit different than other events when it comes to the listener
    // window.addEventListener does not provide all parameters, hence we need to use the window.onerror syntax
    // To be investigated: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
    window.onerror = function (event, source, lineno, colno, error) {
        var _a, _b;
        var value;
        var type;
        var stackFrames = [];
        var eventIsString = isString(event);
        var initialStackFrame = buildStackFrame(source, unknownString, lineno, colno);
        if (error || !eventIsString) {
            _a = getErrorDetails((error !== null && error !== void 0 ? error : event)), value = _a[0], type = _a[1], stackFrames = _a[2];
            if (stackFrames.length === 0) {
                stackFrames = [initialStackFrame];
            }
        }
        else if (eventIsString) {
            _b = getValueAndTypeFromMessage(event), value = _b[0], type = _b[1];
            stackFrames = [initialStackFrame];
        }
        if (value) {
            agent.api.pushException(value, type, stackFrames);
        }
    };
}
//# sourceMappingURL=registerOnerror.js.map
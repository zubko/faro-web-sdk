import { isDomError, isDomException, isError, isErrorEvent, isEvent, isObject } from '@grafana/javascript-agent-core';
import { domErrorType, domExceptionType, objectEventValue } from './const';
import { getStackFramesFromError } from './stackFrames';
export function getErrorDetails(event) {
    var value;
    var type;
    var stackFrames = [];
    var isDomErrorRes;
    var isEventRes;
    if (isErrorEvent(event) && event.error) {
        value = event.error.message;
        type = event.error.name;
        stackFrames = getStackFramesFromError(event.error);
    }
    else if ((isDomErrorRes = isDomError(event)) || isDomException(event)) {
        var name_1 = event.name, message = event.message;
        type = name_1 !== null && name_1 !== void 0 ? name_1 : (isDomErrorRes ? domErrorType : domExceptionType);
        value = message ? "".concat(type, ": ").concat(message) : type;
    }
    else if (isError(event)) {
        value = event.message;
        stackFrames = getStackFramesFromError(event);
    }
    else if (isObject(event) || (isEventRes = isEvent(event))) {
        type = isEventRes ? event.constructor.name : undefined;
        value = "".concat(objectEventValue, " ").concat(Object.keys(event));
    }
    return [value, type, stackFrames];
}
//# sourceMappingURL=getErrorDetails.js.map
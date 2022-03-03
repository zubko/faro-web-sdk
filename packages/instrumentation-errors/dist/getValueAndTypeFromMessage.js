import { defaultExceptionType } from '@grafana/javascript-agent-core';
import { valueTypeRegex } from './const';
export function getValueAndTypeFromMessage(message) {
    var _a, _b;
    var groups = message.match(valueTypeRegex);
    var type = (_a = groups === null || groups === void 0 ? void 0 : groups[1]) !== null && _a !== void 0 ? _a : defaultExceptionType;
    var value = (_b = groups === null || groups === void 0 ? void 0 : groups[2]) !== null && _b !== void 0 ? _b : message;
    return [value, type];
}
//# sourceMappingURL=getValueAndTypeFromMessage.js.map
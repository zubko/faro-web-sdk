var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { initializeExceptions } from './exceptions';
import { initializeLogs } from './logs';
import { initializeMeasurements } from './measurements';
import { initializeTraces } from './traces';
export function initializeAPI(transports, metas) {
    return __assign(__assign(__assign(__assign({}, initializeExceptions(transports, metas)), initializeLogs(transports, metas)), initializeMeasurements(transports, metas)), initializeTraces(transports, metas));
}
//# sourceMappingURL=initialize.js.map
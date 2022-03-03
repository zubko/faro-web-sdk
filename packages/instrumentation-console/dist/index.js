var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { agent, allLogLevels, LogLevel } from '@grafana/javascript-agent-core';
export default function getConsoleInstrumentation(_a) {
    var _b = _a === void 0 ? {} : _a, disabledLevels = _b.disabledLevels;
    var defaultDisabledLevels = [LogLevel.DEBUG, LogLevel.LOG];
    return function () {
        allLogLevels
            .filter(function (level) { return !(disabledLevels !== null && disabledLevels !== void 0 ? disabledLevels : defaultDisabledLevels).includes(level); })
            .forEach(function (level) {
            /* eslint-disable-next-line no-console */
            console[level] = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                try {
                    agent.api.pushLog(args, level);
                }
                catch (err) {
                }
                finally {
                    (_a = agent.api).callOriginalConsoleMethod.apply(_a, __spreadArray([level], args, false));
                }
            };
        });
    };
}
//# sourceMappingURL=index.js.map
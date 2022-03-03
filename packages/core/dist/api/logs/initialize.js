import { TransportItemType } from '../../transports';
import { getCurrentTimestamp } from '../../utils';
import { defaultLogLevel, originalConsoleMethods } from './const';
export function initializeLogs(transports, metas) {
    var pushLog = function (args, level, context) {
        if (level === void 0) { level = defaultLogLevel; }
        if (context === void 0) { context = {}; }
        try {
            transports.execute({
                type: TransportItemType.LOG,
                payload: {
                    message: args
                        .map(function (arg) {
                        try {
                            return String(arg);
                        }
                        catch (err) {
                            return '';
                        }
                    })
                        .join(' '),
                    level: level,
                    context: context,
                    timestamp: getCurrentTimestamp(),
                },
                meta: metas.value,
            });
        }
        catch (err) { }
    };
    var callOriginalConsoleMethod = function (level) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        originalConsoleMethods[level].apply(console, args);
    };
    return {
        callOriginalConsoleMethod: callOriginalConsoleMethod,
        pushLog: pushLog,
    };
}
//# sourceMappingURL=initialize.js.map
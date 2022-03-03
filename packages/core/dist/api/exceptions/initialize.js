import { TransportItemType } from '../../transports';
import { getCurrentTimestamp } from '../../utils';
import { defaultExceptionType } from './const';
export function initializeExceptions(transports, metas) {
    var pushException = function (value, type, stackFrames) {
        if (type === void 0) { type = defaultExceptionType; }
        if (stackFrames === void 0) { stackFrames = []; }
        try {
            var item = {
                meta: metas.value,
                payload: {
                    type: type,
                    value: value,
                    timestamp: getCurrentTimestamp(),
                },
                type: TransportItemType.EXCEPTION,
            };
            if (stackFrames.length > 0) {
                item.payload.stacktrace = {
                    frames: stackFrames,
                };
            }
            transports.execute(item);
        }
        catch (err) { }
    };
    return {
        pushException: pushException,
    };
}
//# sourceMappingURL=initialize.js.map
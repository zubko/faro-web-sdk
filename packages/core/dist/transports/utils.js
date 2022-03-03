var _a;
import { TransportItemType } from './types';
var transportItemTypeToBodyKey = (_a = {},
    _a[TransportItemType.EXCEPTION] = 'exceptions',
    _a[TransportItemType.LOG] = 'logs',
    _a[TransportItemType.MEASUREMENT] = 'measurements',
    _a[TransportItemType.TRACE] = 'traces',
    _a);
export function getTransportBody(item) {
    var _a;
    return _a = {},
        _a[transportItemTypeToBodyKey[item.type]] = [item.payload],
        _a.meta = item.meta,
        _a;
}
//# sourceMappingURL=utils.js.map
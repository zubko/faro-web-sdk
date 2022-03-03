import { TransportItemType } from '../../transports';
export function initializeTraces(transports, metas) {
    var pushSpan = function (payload) {
        transports.execute({
            type: TransportItemType.TRACE,
            payload: payload,
            meta: metas.value,
        });
    };
    return {
        pushSpan: pushSpan,
    };
}
//# sourceMappingURL=initialize.js.map
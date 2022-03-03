import { isFunction } from '../utils';
export function initializeMetas(config) {
    var map = new Map();
    var add = function (key, getter) {
        if (!map.has(key)) {
            map.set(key, getter);
        }
    };
    var remove = function (key) {
        map.delete(key);
    };
    add('sdk', function () { return ({
        name: '@grafana/javascript-agent-core',
        version: '0.0.1', // TODO: set correct version here
    }); });
    config.metas.forEach(function (meta) {
        var metaValues = isFunction(meta) ? meta() : meta;
        Object.entries(metaValues).forEach(function (_a) {
            var key = _a[0], getter = _a[1];
            add(key, getter);
        });
    });
    return {
        add: add,
        map: map,
        remove: remove,
        get value() {
            return Object.fromEntries(Array.from(map.entries()).map(function (_a) {
                var key = _a[0], valueGetter = _a[1];
                return [
                    key,
                    isFunction(valueGetter) ? valueGetter() : valueGetter,
                ];
            }));
        },
    };
}
//# sourceMappingURL=initialize.js.map
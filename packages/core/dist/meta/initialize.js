export function initializeMeta() {
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
        name: '@grafana/javascript-agent',
        version: '0.0.1', // TODO: set correct version here
    }); });
    return {
        add: add,
        map: map,
        remove: remove,
        get values() {
            return Object.fromEntries(Array.from(map.entries()).map(function (_a) {
                var key = _a[0], valueGetter = _a[1];
                return [key, valueGetter()];
            }));
        },
    };
}
//# sourceMappingURL=initialize.js.map
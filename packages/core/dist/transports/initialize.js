var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function initializeTransports(config) {
    var value = __spreadArray([], config.transports, true);
    var add = function () {
        var transports = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            transports[_i] = arguments[_i];
        }
        value.push.apply(value, transports);
    };
    var execute = function (payload) {
        value.forEach(function (transport) { return transport(payload); });
    };
    return {
        add: add,
        execute: execute,
        value: value,
    };
}
//# sourceMappingURL=initialize.js.map
export function isTypeof(value, type) {
    return typeof value === type;
}
export function isToString(value, type) {
    return Object.prototype.toString.call(value) === "'[object ".concat(type, "]'");
}
export function isInstanceOf(value, reference) {
    try {
        return value instanceof reference;
    }
    catch (err) {
        return false;
    }
}
export var isUndefined = (function (value) { return isTypeof(value, 'undefined'); });
export var isNull = (function (value) { return isTypeof(value, 'null'); });
export var isString = (function (value) { return isTypeof(value, 'string'); });
export var isNumber = (function (value) {
    return (isTypeof(value, 'number') && !isNaN(value)) || isTypeof(value, 'bigint');
});
export var isBoolean = (function (value) { return isTypeof(value, 'boolean'); });
export var isSymbol = (function (value) { return isTypeof(value, 'symbol'); });
export var isObject = (function (value) { return !isNull(value) && isTypeof(value, 'object'); });
export var isFunction = (function (value) { return isTypeof(value, 'function'); });
export var isArray = (function (value) { return isToString(value, 'Array'); });
export var isRegExp = (function (value) { return isToString(value, 'RegExp'); });
export var isThenable = (function (value) { var _a; return isFunction((_a = value) === null || _a === void 0 ? void 0 : _a.then); });
export var isPrimitive = (function (value) { return !isObject(value) && !isFunction(value); });
export var isEvent = (function (value) { return !isUndefined(Event) && isInstanceOf(value, Event); });
export var isError = (function (value) { return !isUndefined(Error) && isInstanceOf(value, Error); });
export var isErrorEvent = (function (value) { return isToString(value, 'ErrorEvent'); });
export var isDomError = (function (value) { return isToString(value, 'DOMError'); });
export var isDomException = (function (value) { return isToString(value, 'DOMException'); });
export var isElement = (function (value) { return !isUndefined(Element) && isInstanceOf(value, Element); });
export var isSyntheticEvent = (function (value) {
    return isObject(value) &&
        'nativeEvent' in value &&
        'preventDefault' in value &&
        'stopPropagation' in value;
});
//# sourceMappingURL=is.js.map
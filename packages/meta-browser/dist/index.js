import { UAParser } from 'ua-parser-js';
var browserMeta = function () {
    var parser = new UAParser();
    var _a = parser.getBrowser(), name = _a.name, version = _a.version;
    var _b = parser.getOS(), osName = _b.name, osVersion = _b.version;
    var mobile = navigator.userAgent.includes('Mobi');
    var unknown = 'unknown';
    return {
        browser: function () { return ({
            name: name !== null && name !== void 0 ? name : unknown,
            version: version !== null && version !== void 0 ? version : unknown,
            os: "".concat(osName !== null && osName !== void 0 ? osName : unknown, " ").concat(osVersion !== null && osVersion !== void 0 ? osVersion : unknown),
            mobile: mobile,
        }); },
    };
};
export default browserMeta;
//# sourceMappingURL=index.js.map
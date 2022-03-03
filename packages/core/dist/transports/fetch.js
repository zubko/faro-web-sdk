var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { getTransportBody } from './utils';
// @ts-ignore
function sendAsBeacon(url, body) {
    var blobBody = new Blob([body], { type: 'application/json; charset=UTF-8' });
    navigator.sendBeacon(url, blobBody);
}
function sendAsFetch(body, options) {
    var url = options.url, debug = options.debug, headers = options.headers, restOfOptions = __rest(options, ["url", "debug", "headers"]);
    fetch(url, __assign({ method: 'POST', headers: __assign({ 'Content-Type': 'application/json' }, headers), body: body, keepalive: true }, restOfOptions)).catch(function () {
        if (debug) {
            // eslint-disable-next-line no-console
            console.debug('[GrafanaJavaScriptAgent] Failed sending payload to the receiver', JSON.parse(body));
        }
    }); // the empty callback is required as otherwise the catch will be ignored
}
export function getFetchTransport(options) {
    // TODO: add support for sendBeacon in receiver
    // const sender = !navigator.sendBeacon ? sendAsFetch : sendAsBeacon;
    var sender = sendAsFetch;
    return function (item) {
        try {
            var body = JSON.stringify(getTransportBody(item));
            sender(body, options);
        }
        catch (err) { }
    };
}
//# sourceMappingURL=fetch.js.map
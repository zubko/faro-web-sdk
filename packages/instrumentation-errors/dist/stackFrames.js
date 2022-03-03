import { isNumber } from '@grafana/javascript-agent-core';
import { atString, chromeAddressAtString, chromeAddressAtStringLength, chromeEvalRegex, chromeEvalString, chromeLineRegex, evalString, firefoxEvalRegex, firefoxEvalString, firefoxLineRegex, msLineRegex, newLineString, opera10LineRegex, opera11LineRegex, reactMinifiedRegex, safariExtensionString, safariWebExtensionString, unknownString, } from './const';
export function getDataFromSafariExtensions(func, filename) {
    var isSafariExtension = func === null || func === void 0 ? void 0 : func.includes(safariExtensionString);
    var isSafariWebExtension = !isSafariExtension && (func === null || func === void 0 ? void 0 : func.includes(safariWebExtensionString));
    if (!isSafariExtension && !isSafariWebExtension) {
        return [func, filename];
    }
    return [
        (func === null || func === void 0 ? void 0 : func.includes(atString)) ? func.split(atString)[0] : func,
        isSafariExtension ? "".concat(safariExtensionString, ":").concat(filename) : "".concat(safariWebExtensionString, ":").concat(filename),
    ];
}
export function buildStackFrame(filename, func, lineno, colno) {
    var stackFrame = {
        filename: filename || document.location.href,
        function: func || unknownString,
    };
    if (lineno !== undefined) {
        stackFrame.lineno = lineno;
    }
    if (colno !== undefined) {
        stackFrame.colno = colno;
    }
    return stackFrame;
}
export function getStackFramesFromError(error) {
    var lines = [];
    if (error.stacktrace) {
        lines = error.stacktrace.split(newLineString).filter(function (_line, idx) { return idx % 2 === 0; });
    }
    else if (error.stack) {
        lines = error.stack.split(newLineString);
    }
    var stackFrames = lines.reduce(function (acc, line, idx) {
        var _a, _b;
        var parts;
        var func;
        var filename;
        var lineno;
        var colno;
        if ((parts = chromeLineRegex.exec(line))) {
            func = parts[1];
            filename = parts[2];
            lineno = parts[3];
            colno = parts[4];
            if (filename === null || filename === void 0 ? void 0 : filename.startsWith(chromeEvalString)) {
                var submatch = chromeEvalRegex.exec(filename);
                if (submatch) {
                    filename = submatch[1];
                    lineno = submatch[2];
                    colno = submatch[3];
                }
            }
            filename = (filename === null || filename === void 0 ? void 0 : filename.startsWith(chromeAddressAtString))
                ? filename.substring(chromeAddressAtStringLength)
                : filename;
            _a = getDataFromSafariExtensions(func, filename), func = _a[0], filename = _a[1];
        }
        else if ((parts = msLineRegex.exec(line))) {
            func = parts[1];
            filename = parts[2];
            lineno = parts[3];
            colno = parts[4];
        }
        else if ((parts = firefoxLineRegex.exec(line))) {
            func = parts[1];
            filename = parts[3];
            lineno = parts[4];
            colno = parts[5];
            if (!!filename && filename.includes(firefoxEvalString)) {
                var submatch = firefoxEvalRegex.exec(filename);
                if (submatch) {
                    func = func || evalString;
                    filename = submatch[1];
                    lineno = submatch[2];
                }
            }
            else if (idx === 0 && !colno && isNumber(error.columnNumber)) {
                colno = String(error.columnNumber + 1);
            }
            _b = getDataFromSafariExtensions(func, filename), func = _b[0], filename = _b[1];
        }
        else if ((parts = opera10LineRegex.exec(line))) {
            filename = parts[2];
            func = parts[3];
            lineno = parts[1];
        }
        else if ((parts = opera11LineRegex.exec(line))) {
            filename = parts[6];
            func = parts[3] || parts[4];
            lineno = parts[1];
            colno = parts[2];
        }
        if (filename || func) {
            acc.push(buildStackFrame(filename, func, lineno ? Number(lineno) : undefined, colno ? Number(colno) : undefined));
        }
        return acc;
    }, []);
    if (error.framesToPop) {
        return stackFrames.slice(error.framesToPop);
    }
    if (reactMinifiedRegex.test(error.message)) {
        return stackFrames.slice(1);
    }
    return stackFrames;
}
//# sourceMappingURL=stackFrames.js.map
import { LogLevel } from './types';
export var defaultLogLevel = LogLevel.LOG;
export var allLogLevels = [
    LogLevel.TRACE,
    LogLevel.DEBUG,
    LogLevel.INFO,
    LogLevel.LOG,
    LogLevel.WARN,
    LogLevel.ERROR,
];
export var originalConsoleMethods = allLogLevels.reduce(function (acc, level) {
    /* eslint-disable-next-line no-console */
    acc[level] = console[level];
    return acc;
}, {});
//# sourceMappingURL=const.js.map
export function initializeInstrumentations(config) {
    config.instrumentations.forEach(function (instrumentation) {
        instrumentation();
    });
}
//# sourceMappingURL=initialize.js.map
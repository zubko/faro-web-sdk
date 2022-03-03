export function initializePlugins(agent) {
    agent.config.plugins
        .filter(function (plugin) { return !!plugin.transports; })
        .forEach(function (plugin) {
        var _a;
        var _b, _c;
        var transports = (_c = (_b = plugin.transports) === null || _b === void 0 ? void 0 : _b.call(plugin, agent)) !== null && _c !== void 0 ? _c : [];
        (_a = agent.transports).add.apply(_a, transports);
    });
    agent.config.plugins
        .filter(function (plugin) { return !!plugin.metas; })
        .forEach(function (plugin) {
        var _a, _b;
        var metas = (_b = (_a = plugin.metas) === null || _a === void 0 ? void 0 : _a.call(plugin, agent)) !== null && _b !== void 0 ? _b : {};
        Object.entries(metas).forEach(function (_a) {
            var key = _a[0], getter = _a[1];
            return agent.meta.add(key, getter);
        });
    });
    agent.config.plugins.forEach(function (plugin) {
        var _a;
        (_a = plugin.instrumentations) === null || _a === void 0 ? void 0 : _a.call(plugin, agent);
    });
}
//# sourceMappingURL=initialize.js.map
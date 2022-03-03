import { initializeAPI } from './api';
import { initializeConfig } from './config';
import { initializeInstrumentations } from './instrumentations';
import { initializeMetas } from './metas';
import { initializeTransports } from './transports';
import { globalObject } from './utils';
export var agent = {};
export function initializeAgent(userConfig) {
    agent.config = initializeConfig(userConfig);
    agent.metas = initializeMetas(agent.config);
    agent.transports = initializeTransports(agent.config);
    agent.api = initializeAPI(agent.transports, agent.metas);
    if (!agent.config.preventGlobalExposure) {
        Object.defineProperty(globalObject, agent.config.globalObjectKey, {
            value: agent,
        });
    }
    initializeInstrumentations(agent.config);
    return agent;
}
//# sourceMappingURL=initialize.js.map
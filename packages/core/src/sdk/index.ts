export { internalGlobalObjectKey } from './const';

export { faro, registerFaro, setInstrumentationsOnFaro } from './register';

export {
  getInternalFromGlobalObject as getInternalFaroFromGlobalObject,
  isInternalFaroOnGlobalObject as isInternalFaroOnGlobalObject,
  setInternalFaroOnGlobalObject as setInternalFaroOnGlobalObject,
} from './internalFaroGlobalObject';

export type { Faro } from './types';

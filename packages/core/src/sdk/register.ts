import type { InternalLogger } from '../internalLogger';
import { setFaroOnGlobalObject } from './faroGlobalObject';
import { setInternalFaroOnGlobalObject } from './internalFaroGlobalObject';
import type { Faro } from './types';

export let faro: Faro = {} as Faro;

export function registerFaro(
  internalLogger: InternalLogger,
  newFaro: Omit<Faro, 'instrumentations'>
): Omit<Faro, 'instrumentations'> {
  internalLogger.debug('Initializing Faro');

  faro = newFaro as Faro;

  setInternalFaroOnGlobalObject(faro);

  setFaroOnGlobalObject(faro);

  return faro;
}

export function setInstrumentationsOnFaro(instrumentations: Faro['instrumentations']): void {
  faro.instrumentations = instrumentations;
}

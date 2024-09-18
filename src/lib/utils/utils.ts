import { expresionAfirmacion } from './enums';

export function boolToAfirmacion(bool: boolean) {
	return bool ? expresionAfirmacion.SI : expresionAfirmacion.NO;
}

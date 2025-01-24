import { expresionAfirmacion } from './enums';

export function boolToAfirmacion(bool: boolean) {
	return bool ? expresionAfirmacion.SI : expresionAfirmacion.NO;
}

export function afirmacionToBool(afirmacion: expresionAfirmacion) {
	return afirmacion === expresionAfirmacion.SI;
}
export function areEqualObjectsDeep<T extends Record<string, any>>(
	obj1: T,
	obj2: T
): boolean {
	if (obj1 === obj2) return true;

	if (
		typeof obj1 !== 'object' ||
		obj1 === null ||
		typeof obj2 !== 'object' ||
		obj2 === null
	) {
		return false;
	}

	// Manejo de estructuras cíclicas
	const visited = new WeakMap<object, object>();

	function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
		if (a === b) return true;

		if (
			typeof a !== 'object' ||
			a === null ||
			typeof b !== 'object' ||
			b === null
		) {
			return false;
		}

		// Evitar bucles infinitos en estructuras cíclicas
		if (visited.has(a)) return visited.get(a) === b;
		visited.set(a, b);

		const keysA = Object.keys(a);
		const keysB = Object.keys(b);

		if (keysA.length !== keysB.length) {
			return false;
		}

		for (const key of keysA) {
			if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
				return false;
			}
		}

		return true;
	}

	return isEqual(obj1, obj2);
}
import type { PageServerLoad } from './$types';
import type { Asignatura } from '$src/lib/types';
import { dbController } from '$src/lib/db/db';

export const load = (async ({ url }) => {
	const searchCodigo = url.searchParams.get('codigo');
	if (searchCodigo === null) {
		throw new Error('No se ha encontrado el código de la asignatura');
	}

	const asignatura = await dbController.getAsignatura(searchCodigo);

	if (asignatura === null) {
		throw new Error('No se ha encontrado la asignatura');
	}

	return {
		asignatura: asignatura
	};
}) satisfies PageServerLoad;

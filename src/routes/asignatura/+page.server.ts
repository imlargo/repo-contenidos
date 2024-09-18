import type { PageServerLoad } from './$types';
import type { Asignatura } from '$src/lib/types';

export const load = (async ({ url }) => {

	const searchCodigo = url.searchParams.get('codigo');
	if (searchCodigo === null) {
		throw new Error('No se ha encontrado el código de la asignatura');
	}

	const { default: jsonData } = await import('./data.json');
	const asignaturas: Asignatura[] = jsonData as Asignatura[];

	// Example
	const asignatura: Asignatura = asignaturas.find(({ codigo }) => codigo === searchCodigo) as Asignatura;

	return {
		asignatura: asignatura
	};
}) satisfies PageServerLoad;

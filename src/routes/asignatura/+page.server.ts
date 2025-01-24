import type { PageServerLoad } from './$types';
import type { Asignatura } from '$src/lib/types/asignatura';
import { dbController } from '$src/lib/db/db';
import { AteneaService } from '$src/lib/services/atenea';

export const load = (async ({ url }) => {
	const codigo = url.searchParams.get('codigo');
	if (codigo === null) {
		throw new Error('No se ha encontrado el código de la asignatura');
	}

	let asignatura = await dbController.getAsignatura(codigo);
	if (asignatura === null) {
		const ateneaService = new AteneaService();
		const ateneaAsignatura = await ateneaService.getAsignatura(codigo);
		if (ateneaAsignatura === null) {
			throw new Error('No se ha encontrado la asignatura');
		}

		const createdAsignatura = await dbController.createAsignaturaFromAtenea(ateneaAsignatura);
		if (createdAsignatura === null) {
			throw new Error('No se ha podido crear la asignatura');
		}

		asignatura = createdAsignatura;
	}

	return {
		asignatura: asignatura
	};
}) satisfies PageServerLoad;

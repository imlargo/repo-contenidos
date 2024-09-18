import type { RequestHandler } from './$types';
import type { Asignatura } from '$src/lib/types';
import { json } from '@sveltejs/kit';
import { dbController } from '$src/lib/db/db';

export const GET: RequestHandler = async ({ url }) => {
	const searchCodigo = url.searchParams.get('codigo');
	if (searchCodigo === null) {
		return json(null, { status: 400 });
	}

	const asignatura = await dbController.getAsignatura(searchCodigo);
	if (asignatura === null) {
		return json(null, { status: 404 });
	}

	return json(asignatura);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	if (!body.asignatura) {
		return json(false, { status: 400 });
	}

	const asignatura: Asignatura = body.asignatura;
	const result = await dbController.createAsignatura(asignatura);

	return json(result);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = await request.json();

	if (!body.asignatura) {
		return json(false, { status: 400 });
	}

	const codigo: string = body.codigo;
	const asignatura: Asignatura = body.asignatura;
	const result = await dbController.updateAsignatura(codigo, asignatura);

	return json(result);
};

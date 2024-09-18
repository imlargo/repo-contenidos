import type { RequestHandler } from './$types';
import { dbController } from '$src/lib/db/db';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {

    const body = await request.json();
    const searchText = body.searchText;

    if (searchText === undefined) {
        return json({ error: 'searchText is required' }, { status: 400 });
    }

    const resultados = await dbController.searchAsignaturas(searchText);

    return json(resultados);
};
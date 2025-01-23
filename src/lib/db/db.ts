import type { Asignatura, SearchResult } from '$src/lib/types/asignatura';

import { supabase } from '$services/supabase';

class DBController {
	tables = {
		ASIGNATURAS: 'asignaturas',
	}

	async getAsignatura(searchCodigo: string): Promise<Asignatura | null> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select().eq('codigo', searchCodigo)
		.select(`
			*,
			uab(nombre)
		`)

		if (error !== null) {
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Asignatura;
	}

	async createAsignatura(asignatura: Asignatura): Promise<boolean> {
		return true;
	}

	async updateAsignatura(codigo: string, asignatura: Asignatura): Promise<boolean> {
		return true;
	}

	async searchAsignaturas(searchText: string): Promise<SearchResult[]> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select('codigo,nombre,uab(nombre),vigente').textSearch('nombre', `'${searchText}'`)

		if (error !== null) {
			return [];
		}

		return (data as SearchResult[]).sort((a, b) => a.nombre.localeCompare(b.nombre));
	}
}

export const dbController = new DBController();

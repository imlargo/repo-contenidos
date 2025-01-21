import type { SearchResult } from '../types/types';
import type { Asignatura } from '$src/lib/types/asignatura';

import { supabase } from '$services/supabase';

class DBController {
	tables = {
		ASIGNATURAS: 'asignaturas',
	}

	async getAsignatura(searchCodigo: string): Promise<Asignatura | null> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select().eq('codigo', searchCodigo)

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
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select().textSearch('codigo,nombre,uab,vigente', `'${searchText}'`)
		return (data as SearchResult[]).sort((a, b) => a.nombre.localeCompare(b.nombre));
	}
}

export const dbController = new DBController();

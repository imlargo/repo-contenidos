import type { Asignatura, SearchResult, AteneaAsignatura, Uab } from '$src/lib/types/asignatura';
import { supabase } from '$services/supabase';

class DBController {
	tables = {
		ASIGNATURAS: 'asignaturas',
		UABS: 'uabs',
	}

	async getAsignatura(searchCodigo: string): Promise<Asignatura | null> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select().eq('codigo', searchCodigo)
		.select(`*, uab(nombre)`)

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

	async updateAsignatura(id: number, asignatura: Partial<Asignatura>): Promise<Asignatura | null> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).update(asignatura).eq('id', id).select(`*, uab(nombre)`)

		if (error !== null || data === null || data.length === 0) {
			return null;
		}

		return asignatura as Asignatura;
	}

	async searchAsignaturas(searchText: string): Promise<SearchResult[]> {
		const { data, error } = await supabase.from(this.tables.ASIGNATURAS).select('codigo,nombre,uab(nombre),vigente').textSearch('nombre', `'${searchText}'`)

		if (error !== null) {
			return [];
		}

		return (data as SearchResult[]).sort((a, b) => a.nombre.localeCompare(b.nombre));
	}

	async getUabBy(field: keyof Uab, value: string): Promise<Uab | null> {
		const { data, error } = await supabase.from(this.tables.UABS).select().eq(field, value).single()

		if (error !== null) {
			return null;
		}

		if (data === null) {
			return null;
		}

		return data as Uab;
	}

	async createAsignaturaFromAtenea(ateneaAsignatura: AteneaAsignatura): Promise<Asignatura | null> {
		
		const uab = await this.getUabBy("nombre", ateneaAsignatura.uab);
		if (uab === null) return null;
		
		const asignatura: Partial<Asignatura> = {
			codigo: ateneaAsignatura.codigo,
			nombre: ateneaAsignatura.nombre,
			uab: uab.id as any,
			vigente: ateneaAsignatura.vigente,
			horasPresenciales: ateneaAsignatura.horasPresenciales,
			horasNoPresenciales: ateneaAsignatura.horasNoPresenciales,
			creditos: ateneaAsignatura.creditos,
			validable: ateneaAsignatura.validable,
			electiva: ateneaAsignatura.electiva,
			descripcion: ateneaAsignatura.descripcion,
			contenido: ateneaAsignatura.contenido,
		}

		const { data: createdAsignatura, error: error2 } = await supabase.from(this.tables.ASIGNATURAS).insert([asignatura]).select(`*, uab(nombre)`)

		if (error2 !== null || createdAsignatura === null || createdAsignatura.length === 0) {
			console.log(error2);
			
			return null;
		}

		return createdAsignatura[0] as Asignatura;
	}
}

export const dbController = new DBController();

import type { Asignatura, SearchResult } from '$lib/types';

const { default: jsonData } = await import('./data.json');

class DBController {
	asignaturas: Asignatura[];

	constructor() {
		this.asignaturas = jsonData as Asignatura[];
	}

	async getAsignatura(searchCodigo: string): Promise<Asignatura | null> {
		const asignatura: Asignatura = this.asignaturas.find(
			({ codigo }) => codigo === searchCodigo
		) as Asignatura;

		if (asignatura === undefined) {
			return null;
		}

		return asignatura;
	}

	async createAsignatura(asignatura: Asignatura): Promise<boolean> {
		return true;
	}

	async updateAsignatura(codigo: string, asignatura: Asignatura): Promise<boolean> {
		return true;
	}

	async searchAsignaturas(searchText: string): Promise<SearchResult[]> {
		const asignaturas = this.asignaturas.filter(({ nombre }) =>
			nombre.toLowerCase().includes(searchText.toLowerCase())
		);

		return asignaturas.sort((a, b) => a.nombre.localeCompare(b.nombre));
	}
}

export const dbController = new DBController();

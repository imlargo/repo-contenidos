// place files you want to import through the `$lib` alias in this folder.

export interface Asignatura {
	codigo: string;
	nombre: string;
	uab: string;
	vigente: boolean;
	horasPresenciales: number;
	horasNoPresenciales: number;
	creditos: number;
	validable: boolean;
	electiva: boolean;
	descripcion: string;
	contenido: string;
	planes_relacionados: Plan[];
}

export interface Plan {
	codigo: string;
	nombre: string;
}

export interface SearchResult {
	codigo: string;
	nombre: string;
	uab: string;
	vigente: boolean;
}

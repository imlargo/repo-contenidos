export type Uab = {
	id?: number;
	nombre: string;
}

export interface Asignatura {
	id: number;
	codigo: string;
	nombre: string;
	uab: Uab;
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
	uab: Uab;
	vigente: boolean;
}

export interface AteneaAsignatura {
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
}
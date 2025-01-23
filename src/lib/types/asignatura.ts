type Uab = {
	nombre: string;
}

export interface Asignatura {
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

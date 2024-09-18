import type { PageServerLoad } from './$types';
import type { Asignatura } from '$src/lib/types';

export const load = (async () => {

    const asignatura: Asignatura = {
		"codigo": "3007847",
		"nombre": "BASE DE DATOS I",
		"uab": "DEPARTAMENTO DE CIENCIAS DE LA COMPUTACIÓN Y DE LA DECISIÓN",
		"vigente": true,
		"horasPresenciales": 4,
		"horasNoPresenciales": 4,
		"creditos": 3,
		"validable": true,
		"electiva": false,
		"descripcion": "Objetivo general: \nPresentar los conceptos básicos referentes a la teoría de bases de datos, formas de modelarlas, manipularlas y permitir la interacción con ellas mediante un sistema de gestión de bases de datos (SGBD). \n\nObjetivos específicos: \n- Modelar una base de datos tanto conceptual como lógicamente.\n- Hacer uso de un lenguaje de base de datos para la implementación y manipulación de bases de datos relacionales.\n- Construir interfaces de usuario para la interacción con un SGBD.  \n\nMetodología:\n- Clases magistrales.\n- Clases prácticas en la sala de cómputo.\n- Asesorías extra clase.\n- Desarrollo de ejercicios en clase por parte de los estudiantes y el profesor.\n- Asignación de trabajos en grupo.\n\n Evaluación: \n- Exámenes.\n- Trabajos en entregas parciales.",
		"contenido": "Introducción a las Bases de Datos.\n\n1. Características y arquitectura de un SGBD.\n2. Niveles de abstracción en una BD .\n3. Independencias de los datos.\n4. Ventajas y tendencias en las bases de datos.\n\nModelos.\n\n1. Diagrama Entidad-Asociación (E-A).\n2. Modelo Semántico.\n3. Modelo Relacional.\n4. Conversion del modelo E-R al Relacional.\n\nNormalización.\n\n1. Teoría de las Dependencias Funcionales.\n2. Formas Normales 1NF, 2NF, 3NF, BCNF, 4NF.\n\nLenguajes de Manipulación.\n\n1. Álgebra Relacional.\n2. Cálculo Relacional.\n3. SQL (DML, DDL, DCL).",
		"planes_relacionados": [
			"3535 - INGENIERÍA ELÉCTRICA",
			"3531 - INGENIERÍA DE CONTROL",
			"3520 - INGENIERÍA DE SISTEMAS E INFORMÁTICA",
			"3534 - INGENIERÍA DE SISTEMAS E INFORMÁTICA",
			"3647 - CIENCIAS DE LA COMPUTACIÓN"
		]
	}

    return {
		asignatura: asignatura,
	};
}) satisfies PageServerLoad;
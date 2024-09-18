import type { Asignatura, SearchResult } from "$lib/types";

class DBController {

    async getAsignatura(codigo: string): Promise<Asignatura | null> {
        return {} as Asignatura;
    }

    async createAsignatura(asignatura: Asignatura): Promise<boolean> {
        return true;
    }

    async updateAsignatura(codigo: string, asignatura: Asignatura): Promise<boolean> {
        return true;
    }

    async searchAsignaturas(searchText: string): Promise<SearchResult[]> {
        return [{
            nombre: 'Matemáticas',
            codigo: 'MAT101',
        }, {
            nombre: 'Física',
            codigo: 'FIS101',
        }];
    }
    
}


export const dbController = new DBController();
import type { Asignatura } from "../types";

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
    
}


export const dbController = new DBController();
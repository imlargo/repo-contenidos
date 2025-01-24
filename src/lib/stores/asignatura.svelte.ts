import { expresionAfirmacion } from '$src/lib/utils/enums';
import type { Asignatura } from '$src/lib/types/asignatura';
import { boolToAfirmacion, afirmacionToBool } from '$src/lib/utils/utils';
import { dbController } from '$db/db';
import { toast } from "svelte-sonner";

export class StoreAsignatura {
    asignatura: Asignatura;

    constructor(asignatura: Asignatura) {
        this.asignatura = asignatura;
    }

    async updateAsignatura(id: number, data: Partial<Asignatura>) {
        const result = await dbController.updateAsignatura(id, data);

        if (result) {
            toast.success('Asignatura actualizada correctamente');
        } else {
            toast.error('Error al actualizar los datos de la asignatura');
        }

        return result;
    }
}
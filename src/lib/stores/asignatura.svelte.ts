import { expresionAfirmacion } from '$src/lib/utils/enums';
import type { Asignatura } from '$src/lib/types/asignatura';
import { boolToAfirmacion, afirmacionToBool } from '$src/lib/utils/utils';
import { dbController } from '$db/db';
import { toast } from "svelte-sonner";

export class StoreAsignatura {
    asignatura: Asignatura = $state({} as Asignatura);
    initialAsignatura: Asignatura = $state({} as Asignatura);

    constructor(asignatura: Asignatura) {
        this.asignatura = asignatura;
        this.initialAsignatura = { ...asignatura };
    }

    restoreInitialAsignatura(field: keyof Asignatura | null = null) {
        if (field === null) {
            this.asignatura = { ...this.initialAsignatura };
            return;
        }

        (this.asignatura[field as keyof Asignatura] as any) = this.initialAsignatura[field as keyof Asignatura];
    }

    async updateAsignatura(id: number, data: Partial<Asignatura>) {
        toast.loading('Actualizando asignatura...');

        const result = await dbController.updateAsignatura(id, data);

        if (result === null) {
            toast.error('Error al actualizar los datos de la asignatura');
            return;
        }

        toast.success('Asignatura actualizada correctamente');
        this.initialAsignatura = { ...this.asignatura };
    }
}
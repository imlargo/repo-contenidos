import { expresionAfirmacion } from '$src/lib/utils/enums';
import type { Asignatura } from '$src/lib/types/asignatura';
import { boolToAfirmacion, afirmacionToBool } from '$src/lib/utils/utils';
import { dbController } from '$db/db';
import { toast } from "svelte-sonner";

const detailsFields: (keyof Asignatura)[] = [
    "vigente",
    "horasPresenciales",
    "horasNoPresenciales",
    "creditos",
    "validable",
    "electiva",
];

export class StoreAsignatura {
    asignatura: Asignatura = $state({} as Asignatura);
    initialAsignatura: Asignatura = $state({} as Asignatura);

    constructor(asignatura: Asignatura) {
        this.asignatura = asignatura;
        this.initialAsignatura = { ...asignatura };
    }

    hasChangedDetails() {
        return detailsFields.some(field => this.asignatura[field] !== this.initialAsignatura[field]);
    }


    restoreInitialAsignaturaDetails() {
        for (const field of detailsFields) {
            this.restoreInitialAsignatura(field);
        }
    }

    restoreInitialAsignatura(field: keyof Asignatura | null = null) {
        if (field === null) {
            this.asignatura = { ...this.initialAsignatura };
            return;
        }

        (this.asignatura[field as keyof Asignatura] as any) = this.initialAsignatura[field as keyof Asignatura];
    }

    async updateAsignaturaDetails() {
        const data = detailsFields.reduce((acc: Partial<Asignatura>, field) => {
            (acc[field] as any) = this.asignatura[field];
            return acc;
        }, {} as Partial<Asignatura>);

        await this.updateAsignatura(data);
    }

    async updateAsignatura(data: Partial<Asignatura>) {
        toast.loading('Actualizando asignatura...');

        const result = await dbController.updateAsignatura(this.asignatura.id, data);

        if (result === null) {
            toast.error('Error al actualizar los datos de la asignatura');
            return;
        }

        toast.success('Asignatura actualizada correctamente');

        for (const field of Object.keys(data)) {
            (this.initialAsignatura[field as keyof Asignatura] as any) = data[field as keyof Asignatura];
        }
    }
}
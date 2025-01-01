import { expresionAfirmacion } from '$src/lib/utils/enums';
import type { Asignatura } from '$src/lib/types/asignatura';
import { boolToAfirmacion, afirmacionToBool } from '$src/lib/utils/utils';

export class StoreAsignatura {
    asignatura: Asignatura;

    constructor(asignatura: Asignatura) {
        this.asignatura = asignatura;
    }
}
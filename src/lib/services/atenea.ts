import type { AteneaAsignatura } from '$src/lib/types/asignatura';
import { PUBLIC_ATENEA_API } from '$env/static/public';

export class AteneaService {
    async getAsignatura(codigo: string): Promise<AteneaAsignatura | null> {

        const queryParams = new URLSearchParams({ codigo });
        
        const response = await fetch(`${PUBLIC_ATENEA_API}/contenido?${queryParams}`);

        if (response.status !== 200) {
            return null;
        }

        const data = await response.json();

        return {
            codigo: data.codigo,
            nombre: data.nombre,
            uab: data.uab,
            vigente: data.vigente,
            horasPresenciales: data.horasPresenciales,
            horasNoPresenciales: data.horasNoPresenciales,
            creditos: data.creditos,
            validable: data.validable,
            electiva: data.electiva,
            descripcion: data.descripcion,
            contenido: data.contenido,
        };
    }
}
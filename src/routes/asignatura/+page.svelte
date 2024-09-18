<script lang="ts">
    import type { PageData } from './$types';
    
    type Props = {
        data: PageData;
    }
    const { data }: Props = $props();

    const asignatura = data.asignatura;
</script>

<div>
    {asignatura.codigo}
</div>
<script lang="ts">
    import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input/index.js';


    let codigoBusqueda = $state('');
    async function search() {

        if (codigoBusqueda === "") {
            return;
        }

        await goto(`/asignatura?codigo=${codigoBusqueda}`);
    }
</script>

<main class="py-24">
	<section class="flex justify-center items-center">
		<div class="flex gap-1">
			<Input type="number" class="w-full" placeholder="Codigo asignatura" bind:value={codigoBusqueda} />
			<button
				class="inline-flex items-center gap-2 bg-black text-white font-semibold px-5 py-0.5 rounded-md cursor-pointer"
                onclick={search}
			>
				<i class="bi bi-search leading-none"></i>
				<span>Buscar</span>
			</button>
		</div>
	</section>
</main>

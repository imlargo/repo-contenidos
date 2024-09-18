<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { SearchResult } from "$lib/types";
	import { SearchOptions } from '$src/lib/utils/enums';

	let campoBusqueda = $state('');
	let searchBy: SearchOptions = $state(SearchOptions.CODIGO);

	let listado: SearchResult[] = $state([])

	async function search() {
		if (campoBusqueda === '') {
			return;
		}

		if (searchBy === SearchOptions.CODIGO) {
			await goto(`/asignatura?codigo=${campoBusqueda}`);	
		}

		if (searchBy === SearchOptions.NOMBRE) {
			const response = await fetch(`/api/search/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({searchText: campoBusqueda}),
			});

			if (response.ok) {
				listado = await response.json();
				console.log(listado);
			}
		}
	}
</script>

<main class="py-24">
	<section class="flex items-center justify-center">
		<div class="flex gap-2">
			<div class="min-w-40">
				<Select.Root
				selected={{ value: SearchOptions.CODIGO, label: SearchOptions.CODIGO }}
				onSelectedChange={(selected) => {
					if (selected !== undefined) {
						searchBy = selected.value as SearchOptions;
					}
				}}
			>
				<Select.Trigger>
					<Select.Value placeholder="Asignatura Vigente" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Item value={SearchOptions.CODIGO} label={SearchOptions.CODIGO}>{SearchOptions.CODIGO}</Select.Item>
						<Select.Item value={SearchOptions.NOMBRE} label={SearchOptions.NOMBRE}>{SearchOptions.NOMBRE}</Select.Item>
					</Select.Group>
				</Select.Content>
				<Select.Input name="vigente" value={searchBy} />
			</Select.Root>
			</div>

			<Input
				type="text"
				class="min-w-96"
				placeholder="{searchBy} asignatura"
				bind:value={campoBusqueda}
			/>
			<button
				class="inline-flex items-center gap-2 bg-black text-white font-semibold px-5 py-0.5 rounded-md cursor-pointer"
				onclick={search}
			>
				<i class="bi bi-search leading-none"></i>
				<span>Buscar</span>
			</button>
		</div>
	</section>

	<section>
		<div>
			{#if listado.length > 0}
				<ul>
					{#each listado as item}
						<li>{item.codigo} - {item.nombre}</li>
					{/each}
				</ul>
			{:else}
				<p>No se encontraron resultados</p>
			{/if}
		</div>
	</section>
</main>

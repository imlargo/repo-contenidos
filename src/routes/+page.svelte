<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Table from '$lib/components/ui/table';

	import type { SearchResult } from '$lib/types';
	import { SearchOptions } from '$src/lib/utils/enums';

	let campoBusqueda = $state('');
	let searchBy: SearchOptions = $state(SearchOptions.CODIGO);

	let listado: SearchResult[] = $state([]);

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
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ searchText: campoBusqueda })
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
					selected={{ value: SearchOptions.CODIGO, label: 'Por ' + SearchOptions.CODIGO }}
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
							<Select.Item value={SearchOptions.CODIGO} label={'Por ' + SearchOptions.CODIGO}
								>Por {SearchOptions.CODIGO}</Select.Item
							>
							<Select.Item value={SearchOptions.NOMBRE} label={'Por ' + SearchOptions.NOMBRE}
								>Por {SearchOptions.NOMBRE}</Select.Item
							>
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
		<div class="mt-12">
			<Table.Root>
				<Table.Caption>Resultados de busqueda.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="">Codigo</Table.Head>
						<Table.Head>Nombre</Table.Head>
						<Table.Head>Unidad Academica Basica</Table.Head>
						<Table.Head>Vigente</Table.Head>
						<Table.Head>Ver</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each listado as resultadoBusqueda, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium">{resultadoBusqueda.codigo}</Table.Cell>
							<Table.Cell>{resultadoBusqueda.nombre}</Table.Cell>
							<Table.Cell>{resultadoBusqueda.uab}</Table.Cell>
							<Table.Cell class="flex items-center justify-center text-center text-lg">
								<i
									class="flex w-full text-center bi"
									class:bi-check2-circle={resultadoBusqueda.vigente}
									class:bi-x-circle={!resultadoBusqueda.vigente}
									class:text-lime-500={resultadoBusqueda.vigente}
									class:text-rose-500={!resultadoBusqueda.vigente}
								></i>
							</Table.Cell>
							<Table.Cell>
								<a
									href="/asignatura?codigo={resultadoBusqueda.codigo}"
									class="flex items-center gap-1 justify-center px-1 py-1.5 border font-semibold rounded-md cursor-pointer"
								>
									<i class="bi bi-eye"></i>
									<span>Ver</span>
								</a>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</section>
</main>

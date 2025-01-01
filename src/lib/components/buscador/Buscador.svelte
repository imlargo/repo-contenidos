<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { SearchOptions } from '$src/lib/utils/enums';

	import { SearchStore } from '$src/lib/stores/search.svelte';
	const searchStore = new SearchStore();
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title class="text-2xl font-bold text-center">Buscador</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
			<Select.Root
				type="single"
				value={SearchOptions.NOMBRE}
				onValueChange={(value: unknown) => {
					if (value !== undefined) {
						searchStore.searchBy = value as SearchOptions;
					}
				}}
			>
				<Select.Trigger class="w-full md:w-64">
					Por {searchStore.searchBy}
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
			</Select.Root>
			<Input
				type="text"
				class="flex-grow"
				placeholder="{searchStore.searchBy} asignatura"
				bind:value={searchStore.searchValue}
			/>

			<Button onclick={() => searchStore.search()} disabled={searchStore.isLoading}>
				<!--
            {cargando ? (
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search class="mr-2 h-4 w-4" />
            )}
            
            -->
				<i class="bi bi-search leading-none"></i>

				Buscar
			</Button>
		</div>

		{#if searchStore.results.length > 0}
			<div class="">
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
						{#each searchStore.results as resultadoBusqueda, i (i)}
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
		{:else}
			<div class="text-center p-8 bg-muted rounded-lg">
				<p class="text-lg text-muted-foreground">
					{searchStore.isLoading
						? 'Buscando asignaturas...'
						: 'No se encontraron resultados. Intente con otra búsqueda.'}
				</p>
			</div>
		{/if}
	</Card.Content>
</Card.Root>

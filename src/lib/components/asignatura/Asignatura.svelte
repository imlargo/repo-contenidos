<script lang="ts">
	import { expresionAfirmacion } from '$src/lib/utils/enums';
	import type { Asignatura } from '$src/lib/types/asignatura';

	type Props = {
		asignatura: Asignatura;
		allowEdit?: boolean;
	};
	const { asignatura, allowEdit = false }: Props = $props();

	import { MarkdownToHtml } from '$src/lib/utils/markdown-service';
	import Markdown from '$src/lib/components/ui/Markdown.svelte';
	import { boolToAfirmacion, afirmacionToBool } from '$src/lib/utils/utils';
	import Section from '$src/lib/components/asignatura/Section.svelte';
	import InfoItem from '$src/lib/components/asignatura/InfoItem.svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import TextEditor from '$src/lib/components/ui/TextEditor.svelte';
	import { Button } from '$lib/components/ui/button';

	import { StoreAsignatura } from '$src/lib/stores/asignatura.svelte';
	import type { SvelteComponent } from 'svelte';
	const storeAsignatura = new StoreAsignatura(asignatura);

	let editMode = $state(false);

	let contenidoEditor: TextEditor;
	let descripcionEditor: TextEditor;
</script>

<Section>
	<div class="mb-8">
		<div class="flex justify-between">
			<h3 class="font-semibold text-3xl mb-1 flex justify-between gap-3 items-center">
				<span>{storeAsignatura.asignatura.nombre}</span>
				<span class="text-zinc-400 font-light">{storeAsignatura.asignatura.codigo}</span>

				{#if allowEdit}
					<button
						aria-label="Toggle edit mode"
						class="text-xl leading-none"
						onclick={() => {
							editMode = !editMode;
						}}
					>
						{#if editMode}
							<i class="bi bi-eye"></i>
						{:else}
							<i class="bi bi-pencil-square"></i>
						{/if}
					</button>
				{/if}
			</h3>

			{#if editMode}
				<div>
					<Button
						onclick={() => {
							storeAsignatura.restoreInitialAsignaturaDetails();
						}}
						variant="secondary">Cancelar</Button
					>
					<Button
						disabled={!storeAsignatura.hasChangedDetails()}
						onclick={() => {
							storeAsignatura.updateAsignaturaDetails();
						}}>Guardar</Button
					>
				</div>
			{/if}
		</div>

		<p class="text-zinc-500">{storeAsignatura.asignatura.uab.nombre}</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<InfoItem titulo="Créditos">
			{#snippet icon()}
				<i class="bi bi-hash"></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Input
						type="number"
						placeholder="Créditos"
						bind:value={storeAsignatura.asignatura.creditos}
					/>
				{:else}
					<p>{storeAsignatura.asignatura.creditos.toString()}</p>
				{/if}
			{/snippet}
		</InfoItem>

		<InfoItem titulo="Asignatura Vigente">
			{#snippet icon()}
				<i
					class="bi"
					class:bi-check2-circle={storeAsignatura.asignatura.vigente}
					class:bi-x-circle={!storeAsignatura.asignatura.vigente}
					class:text-lime-500={storeAsignatura.asignatura.vigente}
					class:text-rose-500={!storeAsignatura.asignatura.vigente}
				></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Select.Root
						type="single"
						value={storeAsignatura.asignatura.vigente as unknown as string}
						onValueChange={(value: unknown) => {
							if (value !== undefined) {
								storeAsignatura.asignatura.vigente = afirmacionToBool(
									value as unknown as expresionAfirmacion
								);
							}
						}}
					>
						<Select.Trigger>
							{boolToAfirmacion(storeAsignatura.asignatura.vigente)}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Item value={boolToAfirmacion(true)} label={expresionAfirmacion.SI}
									>{expresionAfirmacion.SI}</Select.Item
								>
								<Select.Item value={boolToAfirmacion(false)} label={expresionAfirmacion.NO}
									>{expresionAfirmacion.NO}</Select.Item
								>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{:else}
					<p>{boolToAfirmacion(storeAsignatura.asignatura.vigente)}</p>
				{/if}
			{/snippet}
		</InfoItem>

		<InfoItem titulo="Horas presenciales">
			{#snippet icon()}
				<i class="bi bi-clock"></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Input
						type="number"
						placeholder="Horas presenciales"
						bind:value={storeAsignatura.asignatura.horasPresenciales}
					/>
				{:else}
					<p>{storeAsignatura.asignatura.horasPresenciales.toString()}</p>
				{/if}
			{/snippet}
		</InfoItem>

		<InfoItem titulo="Libre Elección">
			{#snippet icon()}
				<i class="bi bi-bookmark"></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Select.Root
						type="single"
						value={storeAsignatura.asignatura.electiva as unknown as string}
						onValueChange={(value) => {
							if (value !== undefined) {
								storeAsignatura.asignatura.electiva = afirmacionToBool(
									value as unknown as expresionAfirmacion
								);
							}
						}}
					>
						<Select.Trigger>
							{boolToAfirmacion(storeAsignatura.asignatura.electiva)}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Item value={boolToAfirmacion(true)} label={expresionAfirmacion.SI}
									>{expresionAfirmacion.SI}</Select.Item
								>
								<Select.Item value={boolToAfirmacion(false)} label={expresionAfirmacion.NO}
									>{expresionAfirmacion.NO}</Select.Item
								>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{:else}
					<p>{boolToAfirmacion(storeAsignatura.asignatura.electiva)}</p>
				{/if}
			{/snippet}
		</InfoItem>

		<InfoItem titulo="Validable">
			{#snippet icon()}
				<i
					class="bi"
					class:bi-check2-circle={storeAsignatura.asignatura.validable}
					class:bi-x-circle={!storeAsignatura.asignatura.validable}
					class:text-lime-500={storeAsignatura.asignatura.validable}
					class:text-rose-500={!storeAsignatura.asignatura.validable}
				></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Select.Root
						type="single"
						value={storeAsignatura.asignatura.validable as unknown as string}
						onValueChange={(value) => {
							if (value !== undefined) {
								storeAsignatura.asignatura.validable = afirmacionToBool(
									value as unknown as expresionAfirmacion
								);
							}
						}}
					>
						<Select.Trigger>
							{boolToAfirmacion(storeAsignatura.asignatura.validable)}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Item value={boolToAfirmacion(true)} label={expresionAfirmacion.SI}
									>{expresionAfirmacion.SI}</Select.Item
								>
								<Select.Item value={boolToAfirmacion(false)} label={expresionAfirmacion.NO}
									>{expresionAfirmacion.NO}</Select.Item
								>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{:else}
					<p>{boolToAfirmacion(storeAsignatura.asignatura.validable)}</p>
				{/if}
			{/snippet}
		</InfoItem>

		<InfoItem titulo="Horas no presenciales">
			{#snippet icon()}
				<i class="bi bi-clock"></i>
			{/snippet}
			{#snippet data()}
				{#if editMode}
					<Input
						type="number"
						placeholder="Horas no presenciales"
						bind:value={storeAsignatura.asignatura.horasNoPresenciales}
					/>
				{:else}
					<p>{storeAsignatura.asignatura.horasNoPresenciales.toString()}</p>
				{/if}
			{/snippet}
		</InfoItem>
	</div>
</Section>

<Section>
	<div class="flex justify-between mb-8">
		<h3 class="flex gap-2 font-semibold text-3xl">
			<i class="bi bi-text-left"></i>
			<span>Descripción</span>
		</h3>

		{#if editMode}
			<div>
				<Button
					onclick={() => {
						storeAsignatura.restoreInitialAsignatura('descripcion');
						descripcionEditor.replaceContent(storeAsignatura.asignatura.descripcion);
					}}
					variant="secondary">Cancelar</Button
				>
				<Button
					disabled={storeAsignatura.asignatura.descripcion === '' ||
						storeAsignatura.asignatura.descripcion ===
							storeAsignatura.initialAsignatura.descripcion}
					onclick={() => {
						storeAsignatura.updateAsignatura({ descripcion: asignatura.descripcion });
					}}>Guardar</Button
				>
			</div>
		{/if}
	</div>

	{#if editMode}
		<div class="grid grid-cols-2 gap-x-8">
			<div class="flex flex-col">
				<TextEditor
					bind:this={descripcionEditor}
					bind:value={storeAsignatura.asignatura.descripcion}
				/>
			</div>

			<div>
				<Markdown
					html={storeAsignatura.asignatura.descripcion === ''
						? 'Empiece a escribir...'
						: MarkdownToHtml(storeAsignatura.asignatura.descripcion)}
				/>
			</div>
		</div>
	{:else}
		<div>
			<Markdown html={MarkdownToHtml(storeAsignatura.asignatura.descripcion)} />
		</div>
	{/if}
</Section>

<Section>
	<div class="flex justify-between mb-8">
		<h3 class="flex gap-2 font-semibold text-3xl">
			<i class="bi bi-journal-bookmark"></i>
			<span>Contenido</span>
		</h3>

		{#if editMode}
			<div>
				<Button
					onclick={() => {
						storeAsignatura.restoreInitialAsignatura('contenido');
						contenidoEditor.replaceContent(storeAsignatura.asignatura.contenido);
					}}
					variant="secondary">Cancelar</Button
				>
				<Button
					disabled={storeAsignatura.asignatura.contenido === '' ||
						storeAsignatura.asignatura.contenido === storeAsignatura.initialAsignatura.contenido}
					onclick={() => {
						storeAsignatura.updateAsignatura({ contenido: asignatura.contenido });
					}}>Guardar</Button
				>
			</div>
		{/if}
	</div>

	{#if editMode}
		<div class="grid grid-cols-2 gap-x-8">
			<div class="flex flex-col">
				<TextEditor bind:this={contenidoEditor} bind:value={storeAsignatura.asignatura.contenido} />
			</div>

			<div class="flex flex-col text-wrap">
				<Markdown
					html={storeAsignatura.asignatura.contenido === ''
						? 'Empiece a escribir...'
						: MarkdownToHtml(storeAsignatura.asignatura.contenido)}
				/>
			</div>
		</div>
	{:else}
		<div>
			<Markdown html={MarkdownToHtml(storeAsignatura.asignatura.contenido)} />
		</div>
	{/if}
</Section>

<Section>
	<div class="mb-8">
		<h3 class="flex gap-2 font-semibold text-3xl">
			<i class="bi bi-mortarboard"></i>
			<span>Planes Relacionados</span>
		</h3>
	</div>

	<div class="flex flex-col gap-3">
		{#each storeAsignatura.asignatura.planes_relacionados as plan}
			<div class="flex bg-zinc-100 px-3 py-2 rounded-md">
				<div class="flex gap-2">
					<i class="bi bi-bookmark"></i>
					<span>{plan.codigo} - {plan.nombre}</span>
				</div>
			</div>
		{/each}
	</div>
</Section>

<style lang="scss">
	.slot-info {
		@apply rounded-md hover:bg-zinc-100 py-2 px-3;
	}
</style>

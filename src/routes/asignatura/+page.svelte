<script lang="ts">
	import type { PageData } from './$types';
	import { expresionAfirmacion } from '$src/lib/utils/enums';

	type Props = {
		data: PageData;
	};
	const { data }: Props = $props();

	const asignatura = $state(data.asignatura);

	import { MarkdownToHtml } from '$src/lib/utils/markdown-service';
	import Markdown from '$src/lib/components/ui/Markdown.svelte';
	import { boolToAfirmacion } from '$src/lib/utils/utils';
	import Section from '$src/lib/components/asignatura/Section.svelte';
	import InfoItem from '$src/lib/components/asignatura/InfoItem.svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import TextEditor from '$src/lib/components/ui/TextEditor.svelte';

	let editMode = $state(false);
</script>

<main class="py-12 flex flex-col gap-5">
	<Section>
		<div class="mb-8">
			<div class="flex justify-between">
				<h3 class="font-semibold text-3xl mb-1 flex justify-between gap-3 items-center">
					<span>{asignatura.nombre}</span>
					<span class="text-zinc-400 font-thin">{asignatura.codigo}</span>
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
				</h3>

				{#if editMode}
					<button disabled class="btn-save">Guardar</button>
				{/if}
			</div>

			<p class="text-zinc-500">{asignatura.uab}</p>
		</div>

		<div class="grid grid-cols-3 gap-4">
			<InfoItem titulo="Créditos">
				{#snippet icon()}
					<i class="bi bi-hash"></i>
				{/snippet}
				{#snippet data()}
					{#if editMode}
						<Input type="number" placeholder="Créditos" bind:value={asignatura.creditos} />
					{:else}
						<p>{asignatura.creditos.toString()}</p>
					{/if}
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Asignatura Vigente">
				{#snippet icon()}
					<i
						class="bi"
						class:bi-check2-circle={asignatura.vigente}
						class:bi-x-circle={!asignatura.vigente}
						class:text-lime-500={asignatura.vigente}
						class:text-rose-500={!asignatura.vigente}
					></i>
				{/snippet}
				{#snippet data()}
					{#if editMode}
						<Select.Root
							selected={{ value: asignatura.vigente, label: boolToAfirmacion(asignatura.vigente) }}
							onSelectedChange={(value: { value: boolean; label: string }) =>
								(asignatura.vigente = value.value)}
						>
							<Select.Trigger>
								<Select.Value placeholder="Asignatura Vigente" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Item value={true} label={expresionAfirmacion.SI}
										>{expresionAfirmacion.SI}</Select.Item
									>
									<Select.Item value={false} label={expresionAfirmacion.NO}
										>{expresionAfirmacion.NO}</Select.Item
									>
								</Select.Group>
							</Select.Content>
							<Select.Input name="vigente" value={asignatura.vigente} />
						</Select.Root>
					{:else}
						<p>{boolToAfirmacion(asignatura.vigente)}</p>
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
							bind:value={asignatura.horasPresenciales}
						/>
					{:else}
						<p>{asignatura.horasPresenciales.toString()}</p>
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
							selected={{
								value: asignatura.electiva,
								label: boolToAfirmacion(asignatura.electiva)
							}}
							onSelectedChange={(value: { value: boolean; label: string }) =>
								(asignatura.electiva = value.value)}
						>
							<Select.Trigger>
								<Select.Value placeholder="Libre Elección" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Item value={true} label={expresionAfirmacion.SI}
										>{expresionAfirmacion.SI}</Select.Item
									>
									<Select.Item value={false} label={expresionAfirmacion.NO}
										>{expresionAfirmacion.NO}</Select.Item
									>
								</Select.Group>
							</Select.Content>
							<Select.Input name="vigente" />
						</Select.Root>
					{:else}
						<p>{boolToAfirmacion(asignatura.electiva)}</p>
					{/if}
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Validable">
				{#snippet icon()}
					<i
						class="bi"
						class:bi-check2-circle={asignatura.validable}
						class:bi-x-circle={!asignatura.validable}
						class:text-lime-500={asignatura.validable}
						class:text-rose-500={!asignatura.validable}
					></i>
				{/snippet}
				{#snippet data()}
					{#if editMode}
						<Select.Root
							selected={{
								value: asignatura.validable,
								label: boolToAfirmacion(asignatura.validable)
							}}
							onSelectedChange={(value: { value: boolean; label: string }) =>
								(asignatura.validable = value.value)}
						>
							<Select.Trigger>
								<Select.Value placeholder="Validable" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Item value={true} label={expresionAfirmacion.SI}
										>{expresionAfirmacion.SI}</Select.Item
									>
									<Select.Item value={false} label={expresionAfirmacion.NO}
										>{expresionAfirmacion.NO}</Select.Item
									>
								</Select.Group>
							</Select.Content>
							<Select.Input name="vigente" value={asignatura.validable} />
						</Select.Root>
					{:else}
						<p>{boolToAfirmacion(asignatura.validable)}</p>
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
							bind:value={asignatura.horasNoPresenciales}
						/>
					{:else}
						<p>{asignatura.horasNoPresenciales.toString()}</p>
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

			<button class="btn-save">Guardar</button>
		</div>

		{#if editMode}
			<div class="grid grid-cols-2 gap-x-8">
				<div class="flex flex-col">
					<TextEditor bind:value={asignatura.descripcion} />
				</div>

				<div>
					<Markdown
						html={asignatura.descripcion === ''
							? 'Empiece a escribir...'
							: MarkdownToHtml(asignatura.descripcion)}
					/>
				</div>
			</div>
		{:else}
			<div>
				<Markdown html={MarkdownToHtml(asignatura.descripcion)} />
			</div>
		{/if}
	</Section>

	<Section>
		<div class="flex justify-between mb-8">
			<h3 class="flex gap-2 font-semibold text-3xl">
				<i class="bi bi-journal-bookmark"></i>
				<span>Contenido</span>
			</h3>

			<button class="btn-save">Guardar</button>
		</div>

		{#if editMode}
			<div class="grid grid-cols-2 gap-x-8">
				<div class="flex flex-col">
					<TextEditor bind:value={asignatura.contenido} />
				</div>

				<div class="flex flex-col text-wrap">
					<Markdown
						html={asignatura.contenido === ''
							? 'Empiece a escribir...'
							: MarkdownToHtml(asignatura.contenido)}
					/>
				</div>
			</div>
		{:else}
			<div>
				<Markdown html={MarkdownToHtml(asignatura.contenido)} />
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
			{#each asignatura.planes_relacionados as plan}
				<div class="flex bg-zinc-100 px-3 py-2 rounded-md">
					<div class="flex gap-2">
						<i class="bi bi-bookmark"></i>
						<span>{plan.codigo} - {plan.nombre}</span>
					</div>
				</div>
			{/each}
		</div>
	</Section>
</main>

<style lang="scss">
	.slot-info {
		@apply rounded-md hover:bg-zinc-100 py-2 px-3;
	}

	.btn-save {
		@apply bg-black text-white font-semibold px-4 py-1 rounded-md cursor-pointer;

		&:disabled,
		&[disabled] {
			@apply bg-zinc-100 text-zinc-600 cursor-auto;
		}
	}
</style>

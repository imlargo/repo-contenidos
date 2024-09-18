<script lang="ts">
	import type { PageData } from './$types';
	import { expresionAfirmacion } from '$src/lib/utils/enums';

	type Props = {
		data: PageData;
	};
	const { data }: Props = $props();

	const asignatura = data.asignatura;

	import { MarkdownToHtml } from '$src/lib/utils/markdown-service';
	import Markdown from '$src/lib/components/ui/Markdown.svelte';
	import { boolToAfirmacion } from '$src/lib/utils/utils';

	import Section from '$src/lib/components/asignatura/Section.svelte';
	import InfoItem from '$src/lib/components/asignatura/InfoItem.svelte';
</script>

<main class="py-12 flex flex-col gap-5">
	<Section>
		<div class="mb-8">
			<h3 class="font-semibold text-3xl mb-1">{asignatura.nombre}</h3>
			<p class="text-zinc-500">{asignatura.uab}</p>
		</div>

		<div class="grid grid-cols-3 gap-4">
			<InfoItem titulo="Créditos" info={asignatura.creditos.toString()}>
				{#snippet icon()}
					<i class="bi bi-hash"></i>
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Asignatura Vigente" info={boolToAfirmacion(asignatura.vigente)}>
				{#snippet icon()}
					<i
						class="bi"
						class:bi-check2-circle={asignatura.vigente}
						class:bi-x-circle={!asignatura.vigente}
						class:text-lime-500={asignatura.vigente}
						class:text-rose-500={!asignatura.vigente}
					></i>
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Horas presenciales" info={asignatura.horasPresenciales.toString()}>
				{#snippet icon()}
					<i class="bi bi-clock"></i>
				{/snippet}
			</InfoItem>

			<InfoItem
				titulo="Libre Elección"
				info={asignatura.electiva ? expresionAfirmacion.SI : expresionAfirmacion.NO}
			>
				{#snippet icon()}
					<i class="bi bi-bookmark"></i>
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Validable" info={boolToAfirmacion(asignatura.validable)}>
				{#snippet icon()}
					<i
						class="bi"
						class:bi-check2-circle={asignatura.validable}
						class:bi-x-circle={!asignatura.validable}
						class:text-lime-500={asignatura.validable}
						class:text-rose-500={!asignatura.validable}
					></i>
				{/snippet}
			</InfoItem>

			<InfoItem titulo="Horas no presenciales" info={asignatura.horasNoPresenciales.toString()}>
				{#snippet icon()}
					<i class="bi bi-clock"></i>
				{/snippet}
			</InfoItem>
		</div>
	</Section>

	<Section>
		<div class="mb-8">
			<h3 class="flex gap-2 font-semibold text-3xl">
				<i class="bi bi-text-left"></i>
				<span>Descripción</span>
			</h3>
		</div>

		<div>
			<Markdown html={MarkdownToHtml(asignatura.descripcion)} />
		</div>
	</Section>

	<Section>
		<div class="mb-8">
			<h3 class="flex gap-2 font-semibold text-3xl">
				<i class="bi bi-journal-bookmark"></i>
				<span>Contenido</span>
			</h3>
		</div>

		<div>
			<Markdown html={MarkdownToHtml(asignatura.contenido)} />
		</div>
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
						<span>{plan}</span>
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
</style>

<script lang="ts">
	import type { PageData } from './$types';
	import Asignatura from '$lib/components/asignatura/Asignatura.svelte';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
	const asignatura = $state(data.asignatura);
</script>

<main class="flex flex-col gap-5">
	<div class="">
		<a href="/">
			<i class="bi bi-arrow-left"></i>
			<span>Regresar</span>
		</a>

	</div>
	<Asignatura asignatura={asignatura} allowEdit />
</main>
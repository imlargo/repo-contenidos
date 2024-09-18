<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		icon: Snippet;
		titulo: string;
		info: string;
	};

	const { icon, titulo, info }: Props = $props();
</script>

<div class="bg-zinc-100 rounded-lg p-3 transition-all duration-300 hover:bg-zinc-200">
	<h3 class="flex gap-2 font-semibold">
		{@render icon()}
		<span>{titulo}</span>
	</h3>
	<p>{info}</p>
</div>

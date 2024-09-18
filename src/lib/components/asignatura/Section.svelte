<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

<section class="border rounded-lg p-6 shadow-md">
	{@render children()}
</section>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		color: string;
		children: Snippet;
	};

	const { color, children }: Props = $props();
</script>

<span
	class="inline-flex h-min items-center rounded-full px-5 py-1 text-xs font-semibold ring-1 ring-inset badge-{color}"
>
	{@render children()}
</span>

<style lang="scss">
	.badge-red {
		@apply bg-rose-100 ring-rose-600/20 text-rose-700;
	}

	.badge-yellow {
		@apply bg-amber-950 ring-amber-400/50 text-amber-300;
	}

	.badge-green {
		@apply bg-lime-100 ring-lime-600/20 text-lime-700;
	}

	.badge-purple {
		@apply bg-violet-950 ring-violet-400/50 text-violet-300;
	}
</style>

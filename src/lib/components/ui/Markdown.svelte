<script lang="ts">
	type Props = {
		html: string;
	};

	const { html }: Props = $props();
</script>

<div class="md flex flex-col gap-1 text-wrap" spellcheck="true">
	{@html html}
</div>

<style lang="scss">
	.md :global(h1) {
		@apply text-3xl font-bold;
	}

	.md :global(h2) {
		@apply text-2xl font-bold;
	}

	.md :global(h3) {
		@apply text-xl font-bold;
	}

	.md :global(h4) {
		@apply text-lg font-bold;
	}

	.md :global(h5) {
		@apply text-base font-bold;
	}

	.md :global(ul) {
		@apply list-disc flex flex-col gap-1 pl-5;
	}

	.md :global(p) {
		@apply font-light text-base mb-1;
	}

	.md :global(strong) {
		@apply font-light text-base font-semibold;
	}

	.md :global(a) {
		@apply underline;
	}

	.md :global(ol) {
		@apply list-disc flex flex-col gap-1 pl-5;
	}
</style>

<script lang="ts">
	import '$styles/app.scss';

	import Nav from '$src/lib/components/layout/Nav.svelte';
	import Footer from '$src/lib/components/layout/Footer.svelte';

	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="px-5 md:max-w-7xl mx-auto container py-5">
	<Nav />

	{@render children()}

	<Footer />
</div>

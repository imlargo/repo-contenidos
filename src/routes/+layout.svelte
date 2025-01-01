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

<Nav />

<div class="flex-grow py-12">
	{@render children()}
</div>

<Footer />


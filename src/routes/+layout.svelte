<script lang="ts">
	import '$styles/app.scss';

	import Nav from '$src/lib/components/layout/Nav.svelte';
	import Footer from '$src/lib/components/layout/Footer.svelte';

	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
	import { Toaster } from "$lib/components/ui/sonner/index.js";
</script>

<Nav />

<div class="flex-grow py-24 container mx-auto">
	{@render children()}
</div>

<Footer />

<Toaster />
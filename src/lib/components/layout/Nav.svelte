<script lang="ts">
	import { page } from '$app/stores';
	import type { SvelteComponent } from 'svelte';

	let modal: SvelteComponent;
</script>

<nav class="grid grid-cols-3 py-8 rounded">
	<div class="flex align-center">
		<a href="/" class="flex gap-2 text-3xl font-mono">
			<i class="bi bi-calendar2-heart text-violet-500"></i>
			<span>Repositorio Contenido</span>
		</a>
	</div>

	<div class="flex align-center justify-center items-center gap-12">
		<a
			class="relative hover:text-purple-500"
			class:nav-link-active={$page.url.pathname === '/'}
			data-sveltekit-reload
			href="/"
		>
			Home
		</a>

		<a
			class="relative hover:text-purple-500"
			class:nav-link-active={$page.url.pathname === '/app'}
			data-sveltekit-reload
			href="/"
		>
			App
		</a>

		<a
			class="relative hover:text-purple-500"
			class:nav-link-active={$page.url.pathname === '/about'}
			data-sveltekit-reload
			href="/"
		>
			About
		</a>
	</div>

	<div class="flex align-center justify-end items-center gap-7">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<a
			class="transition-all duration-300 hover:scale-110 active:scale-95 text-lg"
			href="https://github.com/imlargo"
			target="_blank"
		>
			<i class="bi bi-github"></i>
		</a>

		<!-- svelte-ignore a11y_consider_explicit_label -->
		<a
			class="transition-all duration-300 hover:scale-110 active:scale-95 text-lg"
			href="https://www.instagram.com/imlargo"
			target="_blank"
		>
			<i class="bi bi-instagram"></i>
		</a>

		<!-- svelte-ignore a11y_consider_explicit_label -->
		<a
			class=" transition-all duration-300 hover:scale-110 active:scale-95 text-lg"
			href="https://www.linkedin.com/in/imlargo"
			target="_blank"
		>
			<i class="bi bi-linkedin"></i>
		</a>
	</div>
</nav>

<style lang="scss">
	.nav-link-active:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 0.1rem;
		bottom: -0.1rem;
		left: 0;
		transform-origin: bottom right;
		transform-origin: bottom left;

		@apply bg-purple-300;
	}
</style>

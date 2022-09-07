<script lang="ts">
	import ConnectWallet from '$lib/components/ConnectWallet.svelte';

	import '../app.css';
</script>

<div class="w-full flex flex-row p-4">
	<div class="grow" />
	<ConnectWallet />
</div>

<main class="content-center align-middle items-center h-full w-full">
	<slot />
</main>

<footer>
	<p></p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		/* max-width: 1024px; */
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

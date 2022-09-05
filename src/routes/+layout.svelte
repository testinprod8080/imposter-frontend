<script lang="ts">
	import '../app.css';
</script>

<!-- TODO add wallet connection here -->

<main>
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
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

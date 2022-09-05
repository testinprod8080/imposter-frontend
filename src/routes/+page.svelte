<script lang="ts">
	let searchInput: string;
	let searchResult = {
		status: '',
		searchedContract: ''
	};
	let promise;

	function search() {
		searchResult.status = 'searching';
		searchResult.searchedContract = searchInput;
		promise = getContract(searchInput);
	}

	async function getContract(contractAddress: string) {
		// TODO this calls to blockchain
		if (contractAddress)
			setTimeout(() => searchResult.status = 'success', 3000);
		else
			setTimeout(() => searchResult.status = 'error', 3000);
	}
</script>

<svelte:head>
	<title>Join Game</title>
	<meta name="description" content="Join game page" />
</svelte:head>

<section  class="flex flex-1 flex-col justify-center items-center space-y-5">
	<h1>Find Game</h1>
	<div class="flex space-x-3">
		<input 
			bind:value={searchInput}
			placeholder="Enter game contract address" 
			class="block px-2 py-1 w-96"
		/>
		<button 
			disabled={searchResult.status === 'searching'}
			on:click={search}
			class="p-2 bg-slate-700 text-slate-200 rounded-md"
		>
			Search
		</button>
	</div>

	{#if searchResult.status === 'searching'}
		<h1 class="w-full">Searching...</h1>
	{:else if searchResult.status === 'success'}
		<div class="flex flex-col justify-center items-center">
			<h1 class="w-full">{searchResult.searchedContract} found</h1>
			<a href={"/lobby/" + searchResult.searchedContract}>
				<button class="p-2 bg-slate-700 text-slate-200 rounded-md">
					Join Game
				</button>
			</a>
		</div>
	{:else if searchResult.status === 'error'}
		<h1 class="w-full">{searchResult.searchedContract} is not a valid game</h1>
	{/if}
</section>

<style>
</style>

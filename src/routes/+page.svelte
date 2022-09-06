<script lang="ts">
	import { onMount } from 'svelte';
  import { signerAddress, defaultEvmStores } from 'svelte-ethers-store';
	import GameManager from '../files/GameManager.json';

	onMount(
  	async () => {
      // add a test to return in SSR context
  		// defaultEvmStores.attachContract('imposter', CONTRACT_ADDRESS, GameManager.abi)
      
			promise = defaultEvmStores.setProvider();
    }
  )

	let promise;

	let games = [
		{
			address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
			joined: 2,
			max: 10
		}
	]

  // $: account = $connected && $signer ? $signer.getAddress() : ''
</script>

<svelte:head>
	<title>Join Game</title>
	<meta name="description" content="Join game page" />
</svelte:head>

<div class="w-full">
	<span class="items-end">{$signerAddress}</span>
</div>
<section class="flex flex-1 flex-col justify-center items-center space-y-5">
	<h1>Join Game</h1>
	<table class="table-auto">
		<thead>
			<tr>
				<th>Address</th>
				<th>Joined / Max</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each games as game}
				<tr>
					<th>{game.address}</th>
					<th>{game.joined} / {game.max}</th>
					<th>
						<a href={'/lobby/' + game.address}>
							<button class="p-2 bg-slate-700 text-slate-200 rounded-md">
								Join
							</button>
						</a>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
</style>

<script lang="ts">
	import { connected, contracts, defaultEvmStores } from "svelte-ethers-store";
	import GameManager from '../files/GameManager.json';

	let games = [
		{
			name: "joes-game",
			address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
			joined: 2,
			max: 10
		}
	]

	async function getGameContract(contractAddress: string) {
		defaultEvmStores.attachContract(contractAddress, contractAddress, JSON.stringify(GameManager.abi));

		const count = await $contracts[contractAddress].getPlayerCount();

		return {
			count: count
		};
	}
</script>

<svelte:head>
	<title>Join Game</title>
	<meta name="description" content="Join game page" />
</svelte:head>

<section class="flex flex-1 flex-col justify-center items-center space-y-5">
	{#if $connected}
		<h1>Join Game</h1>
		<table class="table-auto border border-slate-800">
			<thead>
				<tr class="border border-slate-800">
					<th class="p-4 bg-slate-700">Address</th>
					<th class="p-4 bg-slate-700">Joined / Max</th>
					<th class="p-4 bg-slate-700"></th>
				</tr>
			</thead>
			<tbody class="border border-slate-800">
				{#each games as game}
					<!-- svelte-ignore empty-block -->
					{#await getGameContract(game.address)}
					{:then result}
						<tr>
							<th class="p-4 bg-slate-600">{game.address}</th>
							<th class="p-4 bg-slate-600">{result.count} / {game.max}</th>
							<th class="p-4 bg-slate-600">
								<a href={'/lobby/' + game.address}>
									<button class="p-2 bg-slate-700 text-slate-200 rounded-md">
										Join
									</button>
								</a>
							</th>
						</tr>
					{/await}
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style>
</style>

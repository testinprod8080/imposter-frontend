<script lang="ts">
  import { contracts, signerAddress, defaultEvmStores } from 'svelte-ethers-store';
	import GameManager from '../../../files/GameManager.json';

  /** @type {import('./$types').PageData} */
  export let data;

  let gameConfigs = {
    minPlayers: 4,
    maxPlayers: 10,
    voteCooldown: 10
  };

  let players = [
    '0x123',
    '0xdef',
    '0xabc',
    '0x998'
  ];

  let joinedPromise: Promise<boolean>;

  async function isJoined(account: string) {
    if (!$contracts[data.contractAddress])
      defaultEvmStores.attachContract(data.contractAddress, data.contractAddress, JSON.stringify(GameManager.abi));

    const playerInfo = await $contracts[data.contractAddress].players(account);
    return playerInfo.joined;
  }

  async function join(account: string) {
    try {
      if (!$contracts[data.contractAddress])
        defaultEvmStores.attachContract(data.contractAddress, data.contractAddress, JSON.stringify(GameManager.abi));
        
      const transaction = await $contracts[data.contractAddress].join({gasLimit: 400000});
      await transaction.wait();
      joinedPromise = isJoined(account);
    } catch (error) {
      alert('Error while joining: ' + error);
      console.log(error);
    }
  }

  $: {
    joinedPromise = isJoined($signerAddress);
  }
</script>

<section class="flex flex-1 flex-col justify-center items-center space-y-5">
  <h1>Welcome to the Lobby for {data.contractAddress}</h1>

  <!-- svelte-ignore empty-block -->
  {#await joinedPromise}
  {:then joined}
    {#if joined}
      <a href="/">
        <button class="p-2 bg-slate-700 text-slate-200 rounded-md">
          Leave Game
        </button>
      </a>
      
      <div class="flex-col flex items-center">
        <span>Min players: {gameConfigs.minPlayers}</span>
        <span>Max players: {gameConfigs.maxPlayers}</span>
        <span>Vote cooldown: {gameConfigs.voteCooldown} sec</span>
      </div>

      <div class="flex-col flex items-center">
        <h2>
          {players.length} {players.length === 1 ? 'player has' : 'players have'} joined:
        </h2>
        <ul>
          {#each players as player}
            <li>{player}</li>
          {/each}
        </ul>
      </div>

      <a href={"/game/" + data.contractAddress}>
        <button
          class="p-2 bg-slate-700 text-slate-200 rounded-md"
          disabled={players.length < gameConfigs.minPlayers}
        >
          Start Game
        </button>
      </a>
    {:else}
      <button 
        class="p-2 bg-slate-700 text-slate-200 rounded-md"
        on:click={() => join($signerAddress)}
      >
        Join Game
      </button>
    {/if}
  {/await}
</section>
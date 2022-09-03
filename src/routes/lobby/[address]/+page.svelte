<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: Object;

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
</script>

<section class="flex flex-1 flex-col justify-center items-center space-y-5">
  <h1>Welcome to the Lobby for {data.contractAddress}</h1>
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
</section>
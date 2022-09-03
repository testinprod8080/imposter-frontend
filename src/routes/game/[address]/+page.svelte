<script lang="ts">
  import { Task } from '$lib/classes/Task';
  import Actions from '$lib/components/Actions.svelte';
  import PlayerStatus from '$lib/components/PlayerStatus.svelte';

  /** @type {import('./$types').PageData} */
  export let data: Object;

  let myInfo = {
    imposter: false,
    alive: true,
    currentTask: null
  }

  // TODO move to store
  let players = [
    { 
      address: '0x123',
      alive: true
    },
    { 
      address: '0xdef',
      alive: true
    },
    { 
      address: '0xabc',
      alive: true
    },
    { 
      address: '0x998',
      alive: true
    },
    { 
      address: '0xd3d',
      alive: false
    }
  ];
</script>

<section class="flex flex-1 flex-col justify-center items-center space-y-5">
  <div class="flex gap-4 w-full">
    <h1 class="flex-none">Game contract: {data.contractAddress}</h1>
    <div class="grow" />
    <a href="/" class="flex-none">
      <button class="p-2 bg-slate-700 text-slate-200 rounded-md">
        Leave Game
      </button>
    </a>
  </div>
  <div class="items-start w-full">
    <h2>You are on team {myInfo.imposter ? 'Imposters' : 'Real Ones'}</h2>
  </div>

  <div class="grid grid-cols-3 gap-4 w-full">
    <div class="col-span-2 h-full min-w-96 bg-slate-600 rounded-md">
    </div>

    <div class="grid gap-4">
      <div>
        <h2>Players: </h2>
        {#each players as player}
          <div class="flex flex-row">
            {player.address} <PlayerStatus alive={player.alive} />
          </div>
        {/each}
      </div>
      
      <div>
        <Actions imposter={myInfo.imposter} task={myInfo.currentTask} />
      </div>
    </div>
  </div>
</section>
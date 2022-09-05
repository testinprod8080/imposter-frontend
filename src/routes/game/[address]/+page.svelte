<script lang="ts">
  import Actions from '$lib/components/Actions.svelte';
  import PlayerStatus from '$lib/components/PlayerStatus.svelte';
import VoteResultModal from '$lib/components/VoteResultModal.svelte';

  /** @type {import('./$types').PageData} */
  export let data: Object;

  let myInfo = {
    imposter: true,
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

  let _isVoting = false;
  let _hasVoted = false;
  let _showVoteResultsModal = false;
  let _votedPlayer = '';

  function setVoting() {
    _isVoting = true;
    _hasVoted = false;
  }

  function selectVote(votedPlayer: string) {
    _hasVoted = true;
    _votedPlayer = votedPlayer;

		setTimeout(() => {
      _isVoting = false;
      _showVoteResultsModal = true;
    }, 3000);
  }

  function closeModal() {
    _showVoteResultsModal = false;
  }
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
      {#if _isVoting}
        <div>
          {#if _hasVoted}
            <h2>You voted for {_votedPlayer}</h2>
            <span>Waiting for other players to vote...</span>
          {:else}
            <h2>Vote off a player</h2>
            <div class="flex flex-col gap-2">
              {#each players.filter(p => p.alive) as player}
                <button
                  class="p-2 bg-slate-700 text-slate-200 rounded-md"
                  on:click={() => selectVote(player.address)}
                >
                  {player.address}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <div>
          <h2>Players: </h2>
          {#each players as player}
            <div class="flex flex-row">
              {player.address} <PlayerStatus alive={player.alive} />
            </div>
          {/each}
        </div>
        
        <div>
          <Actions imposter={myInfo.imposter} task={myInfo.currentTask} setVoting={setVoting} />
        </div>
      {/if}
    </div>
  </div>

  {#if _showVoteResultsModal}
    <VoteResultModal close={closeModal} />
  {/if}
</section>
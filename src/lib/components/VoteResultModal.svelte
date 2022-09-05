<script lang="ts">
  export let close: Function;

  let voteResults = {
    isTie: false,
    votedOffPlayer: '0xdef',
    votes: 4
  }
</script>

<div 
  class="fixed top-0 left-0 w-full h-full bg-black opacity-30" 
  on:click={close()} 
/>

<div class="absolute top-1/2 left-1/2 bg-primary px-10 py-5 rounded-md items-center justify-center flex flex-col max-w-lg max-h-[calc(100vw_-_4em)] overflow-auto -translate-x-1/2 -translate-y-1/2">
  
  <h2>
    {#if voteResults.isTie}
      No one was voted off. There was a tie.
    {:else}
      {voteResults.votedOffPlayer} was voted of with {voteResults.votes} votes
    {/if}
  </h2>

  <button
    class="p-2 bg-slate-700 text-slate-200 rounded-md"
    on:click={close()}
  >
    Ok
  </button>
</div>
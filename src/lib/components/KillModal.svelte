<script lang="ts">

  export let close: Function;

  // TODO move to store
  let players = [
    '0x123',
    '0xdef',
    '0xabc',
    '0x998'
  ];
</script>

<div 
  class="fixed top-0 left-0 w-full h-full bg-black opacity-30" 
  on:click={close()} 
/>

<div class="absolute top-1/2 left-1/2 bg-primary px-10 py-5 rounded-md items-center justify-center flex flex-col max-w-lg max-h-[calc(100vw_-_4em)] overflow-auto -translate-x-1/2 -translate-y-1/2">
  <h2>Kill Player</h2>

  <div class="flex flex-col gap-2">
    {#each players as player}
      <button
        class="p-2 bg-slate-700 text-slate-200 rounded-md"
        on:click={close()}
      >
        {player}
      </button>
    {/each}
  </div>
</div>
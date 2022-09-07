<script lang="ts">
  import { connected, signerAddress, defaultEvmStores } from 'svelte-ethers-store';
  import { onMount } from 'svelte';

  let promise;

  onMount(
    () => {
      if ($connected)
        connect();
    }
  );

  async function connect() {
    promise = defaultEvmStores.setProvider();
  }

  $: truncatedAddress = $signerAddress ? $signerAddress.substring(0, 5) + '...' + $signerAddress.slice(-4) : 'CONNECT';
</script>

{#if $connected}
  <button 
    class="p-2 bg-slate-700 text-slate-200 rounded-md"
    disabled
  >
    {truncatedAddress}
  </button>
{:else}
  <button 
    class="p-2 bg-slate-700 text-slate-200 rounded-md"
    on:click={connect}
  >
    CONNECT
  </button>
{/if}

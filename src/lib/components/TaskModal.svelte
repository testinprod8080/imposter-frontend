<script lang="ts">
  import { Task } from "$lib/classes/Task";

  export let close: Function;
  export let select: Function;

  // TODO obtain from store
  let tasks = [
    new Task(1, 10 * 1000, null),
    new Task(2, 20 * 1000, null),
    new Task(3, 30 * 1000, null),
    new Task(4, 40 * 1000, null),
    new Task(5, 50 * 1000, null),
  ];
</script>

<div 
  class="fixed top-0 left-0 w-full h-full bg-black opacity-30" 
  on:click={close()} 
/>

<div class="absolute top-1/2 left-1/2 bg-primary px-10 py-5 rounded-md items-center justify-center flex flex-col max-w-lg max-h-[calc(100vw_-_4em)] overflow-auto -translate-x-1/2 -translate-y-1/2">
  <h2>Start Task</h2>

  <div class="flex flex-col gap-2">
    {#each tasks as task}
      <button
        class="p-2 bg-slate-700 text-slate-200 rounded-md"
        on:click={select(task)}
      >
        {'Task ' + task.id + ': ' + (task.timeToComplete / 1000) + ' sec'}
      </button>
    {/each}
  </div>
</div>
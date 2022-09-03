<script lang="ts">
  import type { Task } from "$lib/classes/Task";
  import { onMount } from "svelte";
  import TaskModal from "./TaskModal.svelte";

  export let imposter: boolean;
  export let task: Task | null;

  let showModal = false;

  let imposterActions = [
    'Kill Player',
    'Fake Start Task',
    'Fake Finish Task'
  ];	  

  function handleStartTask(selectedTask: Task) {
    selectedTask.timeStarted = now;
    task = selectedTask;
    showModal = false;
  }

  function handleFinishTask() {
    task = null;
  }

  function handleOpenStartTaskModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
  
  // task countdown
  $: timeStampForCompletion = task 
    ? (task.timeStarted 
        ? task.timeStarted 
        : 0
      ) + task.timeToComplete 
    : 0;
  let time = new Date();
	$: now = time.getTime();
  $: timeLeft = timeStampForCompletion - now;
  
  onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h2>Actions: </h2>

<div class="flex flex-col gap-4">
  {#if imposter}
    {#each imposterActions as action}
      <button class="p-2 bg-slate-700 text-slate-200 rounded-md">
        {action}
      </button>
    {/each}
  {:else}
    {#if task?.id}
      {#if timeLeft <= 0}
        <div class="flex flex-col">
          <span>Task {task.id} completed</span>
          <span>Click Finish Task to leave task area</span>
        </div>
        <button 
          class="p-2 bg-slate-700 text-slate-200 rounded-md"
          on:click={handleFinishTask}
        >
          Finish Task
        </button>
      {:else}
        <div class="flex flex-col">
          <span>Working on Task {task.id}</span>
          <span>{(timeLeft / 1000).toFixed(0)} seconds remaining</span>
        </div>
      {/if}
    {:else}
      <button 
        class="p-2 bg-slate-700 text-slate-200 rounded-md"
        on:click={handleOpenStartTaskModal}
      >
        Start Task
      </button>
    {/if}
  {/if}

  {#if imposter || !task}
    <button class="p-2 bg-slate-700 text-slate-200 rounded-md">
      Call Vote
    </button>
  {/if}
</div>

{#if showModal}
  <TaskModal 
    close={closeModal} 
    select={handleStartTask} 
    imposter={imposter}
  />
{/if}
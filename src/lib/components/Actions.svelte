<script lang="ts">
  import type { Task } from "$lib/classes/Task";
  import { onMount } from "svelte";
  import KillModal from "./KillModal.svelte";
  import TaskModal from "./TaskModal.svelte";

  export let imposter: boolean;
  export let task: Task | null;
  export let setVoting: Function;

  let _showTaskModal = false; 
  let _isFakeStartTask = false;
  let _showKillModal = false;

  function handleOpenStartTaskModal() {
    _showTaskModal = true;
  }

  function handleOpenFakeTaskModal(isFakeStartTask: boolean) {
    _isFakeStartTask = _isFakeStartTask;
    handleOpenStartTaskModal();
  }

  function handleOpenKillPlayerModal() {
    _showKillModal = true;
  }

  function closeModals() {
    _showTaskModal = false;
    _showKillModal = false;
  }

  function handleStartTask(selectedTask: Task) {
    selectedTask.timeStarted = now;
    task = selectedTask;
    _showTaskModal = false;
  }

  function handleFinishTask() {
    task = null;
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

    <button 
      class="p-2 bg-slate-700 text-slate-200 rounded-md"
      on:click={() => handleOpenFakeTaskModal(true)}
    >
      Fake Starting a Task
    </button>
    <button 
      class="p-2 bg-slate-700 text-slate-200 rounded-md"
      on:click={() => handleOpenFakeTaskModal(false)}
    >
      Fake Finishing a Task
    </button>
    <button 
      class="p-2 bg-slate-700 text-slate-200 rounded-md"
      on:click={handleOpenKillPlayerModal}
    >
      Kill Player
    </button>

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
    <button 
      class="p-2 bg-slate-700 text-slate-200 rounded-md"
      on:click={setVoting()}
    >
      Call Vote
    </button>
  {/if}
</div>

{#if _showTaskModal}
  <TaskModal 
    close={closeModals} 
    select={handleStartTask} 
    imposter={imposter}
    isFakeStart={_isFakeStartTask}
  />
{:else if _showKillModal}
  <KillModal
    close={closeModals} 
  />
{/if}
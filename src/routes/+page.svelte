<script lang="ts">
	import { onMount } from 'svelte';
	import { World } from '$lib/world/World';

	let canvasContainer: HTMLDivElement;

  let world: World;

	let sliderValue = 0;

	onMount(async () => {
		world = new World(canvasContainer);
		await world.init();
	});
	
	function render() {
			world.render();
	}

	function handleSliderChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target === null) return;
		console.log(target.value);
		world.setBirdActionsEffectiveWeights(parseFloat(target.value));
	}
</script>

<svelte:head>
	<title>My World</title>
	<meta name="description" content="Personal website built with Svelte and Three.js" />
</svelte:head>

<button on:click={render}>Render</button>

<button on:click={() => world.start()}>Play</button>

<button on:click={() => world.stop()}>Stop</button>

<button on:click={() => world.resetControls()}>Reset Camera</button>

<button on:click={() => world.animateControls()}>Animate Camera</button>

<button on:click={() => world.focusNextBird()}>Focus next</button>

<input type="range" min="0" max="1" step="0.1" bind:value={sliderValue} on:input={handleSliderChange}/>

<div bind:this={canvasContainer}></div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { World } from '$lib/world/World';

	let canvasContainer: HTMLDivElement;

    let world: World;

	onMount(() => {
		world = new World(canvasContainer);
	});
    
    function render() {
        world.start();
    }
</script>

<svelte:head>
	<title>My World</title>
	<meta name="description" content="Personal website built with Svelte and Three.js" />
</svelte:head>

<button on:click={render}>Render</button>

<button on:click={() => world.start()}>Play</button>

<button on:click={() => world.stop()}>Stop</button>

<div bind:this={canvasContainer}></div>

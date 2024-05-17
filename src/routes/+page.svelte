<script lang="ts">
    import { onMount } from 'svelte';
    import { createScene } from '$lib/scene'

    let el:HTMLCanvasElement;

    onMount(() => {
        createScene(el);
    });
</script>

<svelte:head>
    <title>My Homepage</title>
    <meta name="description" content="Personal website built with Svelte and Three.js">
</svelte:head>

<canvas bind:this={el} />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { TeamName } from "../gameplay/types";

	const dispatch = createEventDispatcher();
</script>

<main>
	<h1>Select team:</h1>
	<button on:click={() => dispatch("team1")}>Team 1</button>
	<button on:click={() => dispatch("team2")}>Team 2</button>
</main>

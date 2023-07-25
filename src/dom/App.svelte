<script lang="ts">
	import { Game, GameStage } from "../gameplay/managers/game";
	import { actions } from "../gameplay/data/actions";
	import { camel2title } from "../utils";
	import type { Writable } from "svelte/store";
	import TeamSelect from "./TeamSelect.svelte";
	import GameOver from "./GameOver.svelte";
	import Gameplay from "./Gameplay.svelte";
	import type { GameState } from "../gameplay/types";
	import { onMount } from "svelte";
	let mounted = false;
	let stage: Writable<GameStage>;
	let state: Writable<GameState>;
	let cooldown: Writable<number>;
	let gameover: Writable<{reason:string, outcome:string}>;
	onMount(() => {
		Game.init();
		stage = Game.stage;
		state = Game.state;
		cooldown = Game.moveCooldown;
		gameover = Game.gameOverMsg;
		mounted = true;
	});
</script>

<main>
	{#if mounted}
		{#if $stage == GameStage.TeamSelect}
			<TeamSelect 
				on:team1={() => Game.selectTeam("team1")}  
				on:team2={() => Game.selectTeam("team2")}  
			/>
		{:else if $stage == GameStage.Gameplay}
			<Gameplay cooldown={$cooldown} state={$state} />
		{:else if $stage == GameStage.GameOver}
			<GameOver gameover={$gameover}/>
		{/if}
	{/if}
</main>

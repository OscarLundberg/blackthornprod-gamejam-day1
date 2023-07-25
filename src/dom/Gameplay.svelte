<script lang="ts">
	import { actions } from "../gameplay/data/actions";
	import { camel2title } from "../utils";
	import type { GameState } from "../gameplay/types";
	import { Game } from "../gameplay/managers/game";
	import { StateManager } from "../gameplay/managers/state";
	export let state: GameState;
	export let cooldown: number;
	const allies = StateManager.activeTeam;
	const enemies = StateManager.enemyTeam;
</script>

<main>
	<div>
		<div>
			<h1>Allied Team</h1>
			<h2>{camel2title(allies)}</h2>
			<code>
				{JSON.stringify(state[allies], null, 4)}
			</code>
		</div>
		<div>
			<h1>Enemy Team</h1>
			<h2>{camel2title(enemies)}</h2>
			<code>
				{JSON.stringify(state[enemies], null, 4)}
			</code>
		</div>
	</div>
  <hr>
	<div>
		{#if cooldown >= 0.1}
			Cooldown: {cooldown.toFixed(1)}
		{:else}
			{#each Object.keys(actions) as action}
				<button on:click={() => Game.makeMove(action)}>
					{camel2title(action)}
				</button>
			{/each}
		{/if}
	</div>
</main>

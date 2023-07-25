<script lang="ts">
	import { camel2title } from "../utils";

	export let gameover: { reason: string; outcome: string };
</script>

<main>
  <h1>You {gameover.outcome} </h1>
  <h2>{camel2title(gameover.reason)}</h2>
</main>

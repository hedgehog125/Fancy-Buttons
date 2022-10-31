<script>
	import FancyButton from "$lib/FancyButton.svelte";

	let visible = true;
	const onClick = _ => {
		visible = false;
		setTimeout(_ => {
			visible = true;
		}, 500);
	};
</script>

<main>
	{#if visible}
		{#each new Array(100) as _}  
			<FancyButton {onClick}>
				Click to delete all the buttons
			</FancyButton>
		{/each}
	{/if}
</main>
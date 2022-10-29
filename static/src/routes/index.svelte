<script>
	import FancyButton from "$lib/FancyButton.svelte";
</script>

<main>
	<div class="center">
		<FancyButton>
			Testing
		</FancyButton>
	</div>
</main>

<style>
	.center {
		display: inline;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
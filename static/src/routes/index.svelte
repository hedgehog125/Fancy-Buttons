<script>
	import FancyButton from "$lib/FancyButton.svelte";
	import CircleTransition from "../transitions/CircleTransition.svelte";

	let animate;
	const onClick = element => {
		animate(element);
	};
</script>

<main>
	<CircleTransition bind:animate={animate}></CircleTransition>
	<div class="center">
		<FancyButton {onClick}>
			Testing
		</FancyButton>
	</div>
	<p>
		Something to enable scrolling
	</p>
</main>

<style>
	.center {
		display: inline;
		position: absolute;
		top: 75px;
		left: 600px;
		transform: translate(-50%, -50%);
	}

	p {
		position: relative;
		top: 150vh;
	}
</style>
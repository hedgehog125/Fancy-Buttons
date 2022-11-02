<script>
	import linkPage from "$util/LinkPage.js";
	import { prefetch, goto } from "$app/navigation";

	import FancyButton from "$lib/FancyButton.svelte";
	import CircleTransition from "$lib/transitions/CircleTransition.svelte";

	let animate;
	let buttonElement;
	const onClickStart = _ => {
		prefetch(linkPage("another-page"));
	};
	const onClick = _ => {
		animate(buttonElement).then(_ => {
			goto(linkPage("another-page"));
		});
	};

	$: if (shouldAnimateBack && buttonElement) animate(buttonElement, false);

	let shouldAnimateBack = false;
	const animateBack = _ => {
		if (buttonElement) {
			animate(buttonElement, false);
		}
		else {
			shouldAnimateBack = true;
		}

		return {
			duration: 500
		};
	};
</script>

<main in:animateBack>
	<CircleTransition bind:animate={animate}></CircleTransition>
	<div class="center">
		<FancyButton {onClickStart} {onClick} bind:button={buttonElement}>
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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	p {
		position: relative;
		top: 150vh;
	}
</style>
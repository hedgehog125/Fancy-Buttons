<script>
	/*
	TODO

	*/

	export let width = 100;
	export let height = 100;
	export let color = "#00DE00";

	export let onClick = null;
	export let onClickStart = null;

	const growAmount = 1.05;
	const shrinkAmount = 0.95;
	const minClickEffectStayTime = 150;

	let buttonElement;
	let hoverEffectElement;
	let hovering = false;

	let clickEffectElement;
	let clickEffectX = 0;
	let clickEffectY = 0;
	let clickEffectScale = 0;
	let clickDownEffectFinished = false;
	let clickEnded = false;
	let clicking = false;

	const CIRCLE_TO_SQUARE = Math.SQRT1_2;
	const onHover = _ => {
		hovering = true;

		let animation = hoverEffectElement.animate([
			{
				width: "0%",
				height: "0%",
				opacity: 1
			},
			{
				width: "100%",
				height: "100%",
				opacity: 1
			}
		], {
			duration: 250,
			iterations: 1,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
	};
	const onHoverEnd = _ => {
		hovering = false;

		let animation = hoverEffectElement.animate([
			{
				opacity: 1
			},
			{
				opacity: 0
			}
		], {
			duration: 500,
			iterations: 1,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
	};

	const onClickStartInternal = e => {
		if (onClickStart) onClickStart();

		let rect = buttonElement.getBoundingClientRect();
		clickEffectX = ((e.clientX - rect.left) / rect.width) * 100;
		clickEffectY = ((e.clientY  - rect.top) / rect.height) * 100;
		let squareSize = (Math.max(Math.abs(clickEffectX - 50), Math.abs(clickEffectY - 50)) * 2) + (growAmount * 100);
		clickEffectScale = (squareSize / CIRCLE_TO_SQUARE) + "%";

		let animation = clickEffectElement.animate([
			{
				width: "0%",
				height: "0%",
				opacity: 1
			},
			{
				width: clickEffectScale,
				height: clickEffectScale,
				opacity: 1
			}
		], {
			duration: 200,
			iterations: 1,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
		animation.onfinish = onClickAnimEnded;

		clickDownEffectFinished = false;
		clickEnded = false;
		clicking = true;
	};
	const onClickEndInternal = _ => {
		if (onClick) onClick();

		clickEnded = true;
		if (clickDownEffectFinished) {
			animateClickEffectBack();
		}
	};
	const onClickAnimEnded = _ => {
		setTimeout(_ => {
			if (clickEnded) animateClickEffectBack();
			clickDownEffectFinished = true;
		}, minClickEffectStayTime);
	};
	const animateClickEffectBack = _ => {
		clicking = false;

		let animation = clickEffectElement.animate([
			{
				width: clickEffectScale,
				height: clickEffectScale,
				opacity: 1
			},
			{
				width: clickEffectScale,
				height: clickEffectScale,
				opacity: 0
			}
		], {
			duration: 400,
			iterations: 1,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
	};
</script>

<main style="--width:{width}px;--height:{height}px;--color:{color};--growAmount:{growAmount};--shrinkAmount:{shrinkAmount}">
	<button on:mouseenter={onHover} on:mouseleave={onHoverEnd} on:mousedown={onClickStartInternal} on:mouseup={onClickEndInternal} class:hover={hovering} class:click={clicking} bind:this={buttonElement}>
		<div class="hover effect" bind:this={hoverEffectElement}></div>
		<div class="click effect" bind:this={clickEffectElement} style="top:{clickEffectY}%;left:{clickEffectX}%"></div>
		<div class="content">
			<slot></slot>
		</div>
	</button>
</main>

<style>
	* {
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}

	main {
		position: relative;
		width: var(--width);
		height: var(--height);
	}

	button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: var(--width);
		height: var(--height);
		background-color: var(--color);

		border-width: 2px;
		border-style: solid;
		border-color: rgba(0, 0, 0, 0.15);

		border-radius: calc(var(--height) / 2);
		transition-property: width, height, border-radius, border-width;
		transition-duration: 0.25s;

		overflow: hidden;
	}
	button.hover:not(.click) {
		width: calc(var(--width) * var(--growAmount));
		height: calc(var(--height) * var(--growAmount));
		border-radius: calc((var(--height) * var(--growAmount)) / 2);
	}
	button.click {
		width: calc(var(--width) * var(--shrinkAmount));
		height: calc(var(--height) * var(--shrinkAmount));
		border-radius: calc((var(--height) * var(--shrinkAmount)) / 2);
		border-width: 1.5px;
	}

	.effect, .content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.effect {
		width: 0%;
		height: 0%;

		border-radius: 50%;
	}
	.hover.effect {
		background-color: rgba(255, 255, 255, 0.075);
	}
	.click.effect {
		background-color: rgba(0, 0, 0, 0.1);
	}
	.content {
		font-size: 20px;
		font-weight: bold;
		user-select: unset;

		transition-property: letter-spacing;
		transition-duration: 0.25s;
	}
	button.hover:not(.click) > .content {
		letter-spacing: 1px;
	}
	button.click > .content {
		letter-spacing: -0.5px;
	}
</style>
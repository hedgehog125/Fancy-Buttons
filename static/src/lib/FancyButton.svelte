<script>
	/*
	TODO

	Use extra div and position relative or absolute to prevent layout shift as the button changes size
	*/

	export let width = 100;
	export let height = 100;
	export let color = "#00DE00";

	export let onClick = null;
	export let onClickStart = null;

	const growAmount = 1.05;
	const minClickEffectStayTime = 150;

	let hoverEffectElement;
	let clickEffectElement;
	let clickEffectX = 0;
	let clickEffectY = 0;
	let clickEffectScale = 0;
	let clickDownEffectFinished = false;
	let clickEnded = false;
	let button;	

	const CIRCLE_TO_SQUARE = Math.SQRT1_2;
	let hovering = false;
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

		let rect = button.getBoundingClientRect();
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

<main style="--width:{width}px;--height:{height}px;--color:{color};--growAmount:{growAmount}">
	<button on:mouseenter={onHover} on:mouseleave={onHoverEnd} on:mousedown={onClickStartInternal} on:mouseup={onClickEndInternal} class:hover={hovering} bind:this={button}>
		<div class="hover effect" bind:this={hoverEffectElement}></div>
		<div class="click effect" bind:this={clickEffectElement} style="top:{clickEffectY}%;left:{clickEffectX}%"></div>
		<div class="content">
			<slot></slot>
		</div>
	</button>
</main>

<style>
	button {
		position: relative;

		width: var(--width);
		height: var(--height);
		background-color: var(--color);
		border: 2px solid rgba(0, 0, 0, 0.15);
		border-radius: calc(var(--height) / 2);
		transition-property: width, height, border-radius;
		transition-duration: 0.25s;

		overflow: hidden;
		user-select: none;
	}
	button.hover {
		width: calc(var(--width) * var(--growAmount));
		height: calc(var(--height) * var(--growAmount));
		border-radius: calc((var(--height) * var(--growAmount)) / 2);
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
		background-color: rgba(255, 255, 255, 0.1);
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
	button.hover > .content {
		letter-spacing: 1px;
	}
</style>
<script>
    import { onMount } from "svelte";

	/*
	TODO

	Honor @media (prefers-reduced-motion)
	*/

	export let width = 100;
	export let height = 100;
	export let color = "#00DE00";
	export let button = null;
	$: button = buttonElement;

	export let onClick = null;
	export let onClickStart = null;
	export let onAfterClick = null;

	const growAmount = 1.05;
	const shrinkAmount = 0.95;
	const minClickEffectStayTime = 150;

	let buttonElement;
	let contentElement;
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
	const shouldIgnoreInput = e => e.target != buttonElement && e.target != contentElement;

	const onHover = e => {
		if (shouldIgnoreInput(e)) return;
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
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
	};
	const onHoverEnd = e => {
		if (shouldIgnoreInput(e)) return;
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
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
	};

	const onInputStart = (x = null, y = null) => {
		if (onClickStart) onClickStart(buttonElement);

		let rect = buttonElement.getBoundingClientRect();
		if (x == null) clickEffectX = 50;
		else {
			clickEffectX = ((x - rect.left) / rect.width) * 100;
		}
		if (y == null) clickEffectY = 50;
		else {
			clickEffectY = ((y  - rect.top) / rect.height) * 100;
		}
		
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
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
		animation.onfinish = onClickAnimEnded;

		clickDownEffectFinished = false;
		clickEnded = false;
		clicking = true;
	};
	const onInputEnd = _ => {
		if (onClick) onClick(buttonElement);

		clickEnded = true;
		if (clickDownEffectFinished) {
			animateClickEffectBack();
		}
	};
	const onContextMenu = e => {
		if (e.sourceCapabilities.firesTouchEvents) {
			e.preventDefault();
		}
	};

	const onClickStartInternal = e => {
		if (shouldIgnoreInput(e)) return;
		if (e.sourceCapabilities.firesTouchEvents) return;
		if (e.button != 0) return;

		onInputStart(e.clientX, e.clientY);
	};
	const onClickEndInternal = e => {
		if (! clicking) return; // The target might have changed due to the button shrinking, so don't check it
		if (e.sourceCapabilities.firesTouchEvents) return;
		if (e.button != 0) return;

		onInputEnd();
	};
	const onClickInternal = e => { // Clicks from things like the space bar
		if (shouldIgnoreInput(e)) return;
		if (e.pointerType == "mouse" || e.pointerType == "touch") return;

		onInputStart(); // Assume the position isn't known, this will use the centre
		onInputEnd();
	};
	const onTouchStart = e => {
		if (shouldIgnoreInput(e)) return;

		onInputStart(e.touches[0].clientX, e.touches[0].clientY);
	};
	const onTouchEnd = e => {
		if (! clicking) return;
		hovering = false;

		onInputEnd();
	};

	onMount(_ => {
		document.addEventListener("mousedown", onClickStartInternal);
		document.addEventListener("mouseup", onClickEndInternal);
		document.addEventListener("touchstart", onTouchStart);
		document.addEventListener("touchend", onTouchEnd);

		return _ => {
			document.removeEventListener("mousedown", onClickStartInternal);
			document.removeEventListener("mouseup", onClickEndInternal);
			document.removeEventListener("touchstart", onTouchStart);
			document.removeEventListener("touchend", onTouchEnd);
		}
	});

	const onClickAnimEnded = _ => {
		setTimeout(_ => {
			if (buttonElement == null) return; // It might have been deleted
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
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.onfinish = _ => {
			if (onAfterClick) onAfterClick(buttonElement);
		};
		animation.commitStyles();
	};
</script>

<main style="--width:{width}px;--height:{height}px;--color:{color};--growAmount:{growAmount};--shrinkAmount:{shrinkAmount}">
	<button
		on:mouseenter={onHover}
		on:mouseleave={onHoverEnd}
		on:click={onClickInternal}
		on:contextmenu={onContextMenu}

		class:hover={hovering || clicking}
		class:click={clicking}
		bind:this={buttonElement}
	>
		<div class="hover effect" bind:this={hoverEffectElement}></div>
		<div class="click effect" bind:this={clickEffectElement} style="top:{clickEffectY}%;left:{clickEffectX}%"></div>
		<div class="content" bind:this={contentElement}>
			<slot></slot>
		</div>
	</button>
</main>

<style>
	* {
		pointer-events: none;
		touch-action: none;
	}
	*, button > * { /* The second one is to raise specificity so it overrides what's inherited from button */
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}
	button, .content {
		pointer-events: auto; /* Add the events back */
		touch-action: auto;
	}

	main {
		position: relative;
		width: var(--width);
		height: var(--height);
	}

	button {
		/* Allow selection just for this */
		user-select: initial;
		/* The highlight colour is deliberately excluded here so a long tap doesn't put a box around the button */
		-webkit-touch-callout: initial;
		-webkit-user-select: initial;
		-khtml-user-select: initial;
		-moz-user-select: initial;
		-ms-user-select: initial;

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
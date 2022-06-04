<script>
import { debug } from "svelte/internal";

	import {applyClasses} from "../lib/tools.js";

	/*
	TODO

	Remove spam clicking logic
	Handle multiple touches
	Detect spam click and massively slow down the reverse click animation on release when it's true. Maybe just have multiple tint overlays and keep the button the same size?

	Bugs
	Involving shrinking from click making mouse not touch
	Reverse click animation sometimes doesn't play and it disappears instantly. Possibly to do with hover class not applying correctly and no transition without it
	*/
	

	const hoverStartTime = 0.25 * 1000;
	const clickStartTime = 0.15 * 1000;
	const releaseEarlyDelay = 0.25 * 1000;
	const clickEndTime = 0.25 * 1000;
	const reboundTime = 0.15 * 1000;

	const CIRCLE_TO_SQUARE = Math.SQRT1_2;

	let hoverTask, clickTask, reboundTask, clickEndTask;
	let hovering = false;
	let clicking = false;
	let spamClicking = false;

	let tintEffects = [
		{
			x: 0,
			y: 0,
			scale: 0,
			shrinking: false,
			index: 0
		}
	];
	let display = {
		hovering: false,
		clicking: false,
		rebound: false
	};
	let button;

	const endHover = _ => {
		display.hovering = false;
	};

	const enter = _ => {
		if (reboundTask != null) return;

		if (hoverTask == null) clearTimeout(hoverTask);

		hoverTask = setTimeout(_ => {
			if (! hovering) endHover();

			hoverTask = null;
		}, hoverStartTime);
		hovering = true;
		display.hovering = true;
	};
	const leave = _ => {
		if (reboundTask != null) return;

		if (hoverTask == null) endHover();

		hovering = false;
	};

	const endClick = (deleteCount=tintEffects.length) => {
		if (deleteCount != tintEffects.length) return;

		console.trace(deleteCount, tintEffects.length);
		deleteCount = Math.min(deleteCount, tintEffects.length);

		display.clicking = false;
		display.rebound = true;

		for (let i = 0; i < deleteCount; i++) {
			tintEffects[i].scale = 0;
			tintEffects[i].shrinking = true;
		}

		reboundTask = setTimeout(_ => {
			display.rebound = false;

			reboundTask = null;
		}, reboundTime);
		if (deleteCount == tintEffects.length) {
			clickEndTask = setTimeout(_ => {
				console.log("A");
				tintEffects.splice(1); // Delete all but the last
				tintEffects[0].shrinking = false;
	
				clickEndTask = null;
			}, clickEndTime);
		}
	};

	const clickStart = e => {
		if (reboundTask != null) { // Interupt the animation
			display.rebound = false;

			clearTimeout(reboundTask);
			reboundTask = null;
		}

		let rect = button.getBoundingClientRect();
		
		let x = ((e.clientX - rect.left) / rect.width) * 100;
		let y = ((e.clientY  - rect.top) / rect.height) * 100;

		display.clicking = true;
		
		let squareSize = (Math.max(Math.abs(x - 50), Math.abs(y - 50)) / 50) + 1.1;
		let scale = squareSize / CIRCLE_TO_SQUARE;

		tintEffects[tintEffects.length - 1] = {
			x: x - 50,
			y: y - 50,
			scale: scale,
			shrinking: false,
			index: tintEffects.length - 1
		};

		if (clickTask == null) {
			clickTask = setTimeout(_ => {
				clickTask = null;

				if (! clicking) {
					(effectCountWas => {
						setTimeout(_ => {
							endClick(effectCountWas);
						}, releaseEarlyDelay);
					})(tintEffects.length);
				}
			}, clickStartTime);
		}
		clicking = true;
	};
	const clickEnd = _ => {
		if (reboundTask != null) return;

		tintEffects.push({
			x: 0,
			y: 0,
			scale: 0,
			shrinking: false,
			index: tintEffects.length
		});
		tintEffects = tintEffects;
		
		if (spamClicking) {
			if (clickTask != null) clearTimeout(clickTask);

			clickTask = null;
		}
		if (clickTask == null) endClick();

		clicking = false;
	};
</script>

<main>
	<div class="center">
		<button class={
			applyClasses(
				["large", "hovering", "clicking", "rebound"],
				[true, display.hovering, display.clicking, display.rebound]
			)
		} on:mouseenter={enter} on:mouseleave={leave} on:mousedown={clickStart} on:mouseup={clickEnd} bind:this={button}>
			<div class="content">Hmm</div>
			{#each tintEffects as tint (tint.index)}
				<div class="tint {applyClasses(["shrinking"], [tint.shrinking])}" style="left:{tint.x}%;top:{tint.y}%;transform:scale({tint.scale});">
				
				</div>
			{/each}
		</button>
	</div>
</main>

<style>
	button {
		border-radius: 50%;
		border-width: 3px;
		border-color: rgba(0, 0, 0, 0);

		aspect-ratio: 1;
		font-weight: bold;
		background-color: lime;
		padding: 0px;

		position: relative;
		overflow: hidden;
		user-select: none;

		transition-property: filter, border, transform;
		transition-duration: 0.25s;
		transition-timing-function: ease-in-out;
	}

	button > .content {
		position: relative;
		top: 0%;

		padding: 25px;
	}

	button > .tint {
		position: absolute;
		top: 0px;
		left: 50%;
		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 50%;

		transform: scale(0);

		transition-property: transform, background-color;
	}

	button.hovering {
		transform: scale(1.025);
		border-color: rgba(0, 0, 0, 0.2);

		transition-duration: 0.25s;
		filter: brightness(0.94);
	}

	button.hovering > .tint {
		transition-duration: 0.25s;
		transition-timing-function: ease-in;
	}

	button.clicking {
		transform: scale(1);

		transition-duration: 0.15s;
		transition-timing-function: ease-in;
	}

	button.clicking > .tint {
		transform: scale(1);

		transition-duration: 0.15s;
		transition-timing-function: ease-out;
	}

	button.rebound {
		transform: scale(1.04);

		transition-duration: 0.15s;
		transition-timing-function: ease-out;
	}

	button > .tint.shrinking {
		background-color: rgba(0, 0, 0, 0);
	}

	.large {
		font-size: 100px;
	}

	.center {
		position: absolute;
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}
</style>
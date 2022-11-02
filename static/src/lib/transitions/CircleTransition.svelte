<script>
	/*
	TODO

	*/

	let x = 0;
	let y = 0;
	let color = "red";

	let circleElement;
	let resolveAnimationPromise;

	const SQUARE_TO_CIRCLE = 1 / Math.SQRT1_2;

	export const animate = (posElement, forwards = true) => {
		const rect = posElement.getBoundingClientRect();
		x = rect.left + (rect.width / 2);
		y = rect.top + (rect.height / 2);
		color = getComputedStyle(posElement).backgroundColor;

		const screenWidth = document.documentElement.clientWidth;
		const screenHeight = document.documentElement.clientHeight;
		const endSquareSize = Math.max(
			screenWidth + (Math.abs(x - (screenWidth / 2)) * 2),
			screenHeight + (Math.abs(y - (screenHeight / 2)) * 2)
		);
		const endCircleSize = Math.ceil(endSquareSize * SQUARE_TO_CIRCLE);
		const cssSize = endCircleSize + "px";

		const promise = new Promise(resolve => {
			resolveAnimationPromise = resolve;
		});

		const animation = circleElement.animate(
			forwards? {
				width: cssSize,
				height: cssSize
			} : [
				{
					width: cssSize,
					height: cssSize
				},
				{
					width: "0px",
					height: "0px"
				}
			]
		, {
			delay: forwards? 200 : 0,
			duration: 500,
			iterations: 1,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
		animation.onfinish = _ => {
			resolveAnimationPromise();
		};

		return promise;
	};
</script>

<div class="container">
	<div class="circle" style="--x:{x}px;--y:{y}px;--color:{color}" bind:this={circleElement}></div>
</div>


<style>
	.container {
		position: fixed;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
		z-index: 100;

		pointer-events: none;
		touch-action: none;
	}
	.circle {
		position: absolute;
		top: var(--y);
		left: var(--x);
		transform: translate(-50%, -50%);
		border-radius: 50%;


		background-color: var(--color);
		width: 0px;
		height: 0px;
	}
</style>
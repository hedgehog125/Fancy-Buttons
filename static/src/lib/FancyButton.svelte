<script>
	export let width = 100;
	export let height = 100;
	export let color = "#00DE00";

	let hovering = false;
	const onHover = _ => {
		hovering = true;
	};
	const onHoverEnd = _ => {
		hovering = false;
	};
</script>

<main style="--width:{width}px;--height:{height}px;--color:{color};--growAmount:1.05">
	<button on:mouseenter={onHover} on:mouseleave={onHoverEnd} class:hover={hovering}>
		<div class="effect"></div>
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
	.content {
		font-size: 20px;
		font-weight: bold;

		transition-property: letter-spacing;
		transition-duration: 0.25s;
	}
	button.hover > .content {
		letter-spacing: 1px;
	}
</style>
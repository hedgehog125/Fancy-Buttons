<!-- Because the body can't be styled without a global selector which creates a bunch of issues -->

<script>
	export let color;
</script>

<div style="--color:{color}"></div>

<style>
	div {
		background-color: var(--color);
		z-index: -100;
		pointer-events: none;
		touch-action: none;

		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
</style>
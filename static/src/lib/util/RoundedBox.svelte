<script>
	import { beforeNavigate, goto } from "$app/navigation";
	import linkPage from "$util/LinkPage.js";
    import { onMount } from "svelte";

	export let color = "white";
	export let backURL;

	const scrollIn = (element, params) => scroll(element, params, true);
	const scrollOut = (element, params) => scroll(element, params, false);
	const scroll = (element, params, forwards) => {
		let keyframes = [
			{
				transform: "translateY(calc(100% + var(--margin)))"
			},
			{
				transform: "translateY(0)"
			}
		];
		if (! forwards) keyframes.reverse();

		const animation = element.animate(keyframes, {
			duration: 500,
			easing: "ease-in-out",
			fill: "forwards"
		});
		animation.commitStyles();
		animation.onfinish = _ => {
			if ((! forwards) && navURL) {
				goto(navURL);
			}
		};
		return {
			duration: 500
		};
	};

	onMount(_ => {
		console.trace("Mounted");
		return _ => {
			console.trace(`Dismounted. Navigating: ${navigating}`);
		};
	});

	let navigating = false;
	let navURL;
	beforeNavigate(nav => {
		console.trace(`Navigating to ${nav.to == null? "blank" : nav.to.pathname} from ${nav.from == null? "blank" : nav.from.pathname}. NavURL: ${navURL} | Navigating: ${navigating}`);
		if (nav.to == null) return; // Ignore the initial navigation
		if (nav.to.pathname != linkPage(backURL)) return;
		if (navigating) return; // Ignore the event from the navigation continuing after the animation

		navURL = nav.to.href;
		nav.cancel();
		navigating = true;
	});
</script>

<div class="outer">
	{#if ! navigating}
		<div class="main" in:scrollIn out:scrollOut style="--color:{color};--PI:{Math.PI}">
			<slot/>
		</div>
	{/if}
</div>

<style>
	.outer {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;

		overflow: hidden;
	}
	.main {
		--margin: 30px;
		--padding: min(12.5vw, 12.5vh);

		position: absolute;
		top: var(--margin);
		bottom: var(--margin);
		left: var(--margin);
		right: var(--margin);
		border-radius: var(--padding);
		padding: calc(
			(var(--padding) / var(--PI))
			+ 15px
		);

		background-color: var(--color);
	}
</style>
import adapter from "@sveltejs/adapter-static";

const prod = process.env.NODE_ENV == "production";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors	
	kit: {
		paths: {
			base: prod? "/Fancy-Buttons" : ""
		},

		// hydrate the <div id="svelte"> element in src/app.html
		prerender: {
			default: true
		},
		adapter: adapter({
			pages: "docs",
			assets: "docs",
			fallback: null
		})
	}
};

export default config;
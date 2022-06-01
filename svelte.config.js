import adapter from "@sveltejs/adapter-static";
import path from "path";

const dev = process.env.NODE_ENV === "development";
const repoName = "Fancy-Buttons";
const baseURL = dev? "" : `/${repoName}`;


/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors	
	kit: {
		appDir: "app",
		paths: {
			base: baseURL
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
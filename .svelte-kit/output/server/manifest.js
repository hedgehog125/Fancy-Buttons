export const manifest = {
	appDir: "app",
	assets: new Set([".nojekyll","assets/favicon.png","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-19cb21c9.js","js":["start-19cb21c9.js","chunks/index-b6926417.js","chunks/paths-396f020f.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "hmm",
				pattern: /^\/hmm\/?$/,
				names: [],
				types: [],
				path: "/hmm",
				shadow: null,
				a: [0,3],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

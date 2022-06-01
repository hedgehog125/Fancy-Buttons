import { minify } from "html-minifier";
import { p as prerendering } from "./index-ceb4a045.js";
import "./index-5f038599.js";
import "./paths-396f020f.js";
const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};
async function handle({ event, resolve }) {
  const response = await resolve(event);
  if (prerendering && response.headers.get("content-type") === "text/html") {
    return new Response(minify(await response.text(), minification_options), {
      status: response.status,
      headers: response.headers
    });
  }
  return response;
}
export { handle };

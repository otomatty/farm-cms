import path from "node:path";
import { defineConfig } from "@farmfe/core";
import farmPluginPostcss from "@farmfe/js-plugin-postcss";

export default defineConfig({
	plugins: ["@farmfe/plugin-react", farmPluginPostcss()],
	compilation: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},
	server: {
		cors: true,
	},
});

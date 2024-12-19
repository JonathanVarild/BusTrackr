import { defineConfig } from "vite";
import reactJsxPlugin from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [reactJsxPlugin()],
	assetsInclude: [
		'**/*.png',
		'**/*.ico'
	],
	server: {
		port: 8080,
		proxy: {
			"/api": {
				target: "http://localhost:5005",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		sourcemap: true,
		minify: false,
	},
	resolve: {
		alias: {
			// Force Vite to resolve only static exports
			// See issue: https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
			"@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
		},
	},
});

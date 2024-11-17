/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-themes",
		"@storybook/addon-viewport",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		builder: "@storybook/builder-vite",
	},
	viteFinal: async (config) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...config.resolve.alias,
			"@": "/src",
		};
		return config;
	},
};

export default config;

import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				mobile1: {
					name: "Mobile",
					styles: {
						width: "360px",
						height: "640px",
					},
				},
				tablet: {
					name: "Tablet",
					styles: {
						width: "768px",
						height: "1024px",
					},
				},
				desktop: {
					name: "Desktop",
					styles: {
						width: "1024px",
						height: "768px",
					},
				},
			},
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
		(Story) => (
			<div className="min-h-screen bg-background">
				<Story />
			</div>
		),
	],
};

export default preview;

import type { Meta, StoryObj } from "@storybook/react";
import { SiteHeader } from "./SiteHeader";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Components/Site/Layouts/SiteHeader",
	component: SiteHeader,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

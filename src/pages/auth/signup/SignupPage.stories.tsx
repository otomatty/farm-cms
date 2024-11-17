import type { Meta, StoryObj } from "@storybook/react";
import { SignupPage } from "./SignupPage";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Pages/Auth/SignupPage",
	component: SignupPage,
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
} satisfies Meta<typeof SignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// モバイル表示のストーリー
export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

// タブレット表示のストーリー
export const Tablet: Story = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};

// デスクトップ表示のストーリー
export const Desktop: Story = {
	parameters: {
		viewport: { defaultViewport: "desktop" },
	},
};

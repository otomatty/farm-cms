import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Pages/Auth/LoginPage",
	component: LoginPage,
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
} satisfies Meta<typeof LoginPage>;

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

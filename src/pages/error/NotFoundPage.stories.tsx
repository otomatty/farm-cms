import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundPage } from "./NotFoundPage";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Pages/Error/NotFoundPage",
	component: NotFoundPage,
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
} satisfies Meta<typeof NotFoundPage>;

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

// ダークモードのストーリー
// export const Dark: Story = {
// 	parameters: {
// 		theme: "dark",
// 	},
// };

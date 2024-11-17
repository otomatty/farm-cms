import type { Meta, StoryObj } from "@storybook/react";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Components/Auth/GoogleAuthButton",
	component: GoogleAuthButton,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "radio",
			options: ["default", "outline"],
		},
		isBlock: {
			control: "boolean",
		},
		text: {
			control: "text",
		},
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="w-full max-w-md p-4">
					<Story />
				</div>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof GoogleAuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {
	args: {
		text: "Googleでログイン",
		variant: "outline",
		isBlock: false,
	},
};

// ブロック要素として表示
export const Block: Story = {
	args: {
		text: "Googleでログイン",
		variant: "outline",
		isBlock: true,
	},
};

// デフォルトバリアント
export const DefaultVariant: Story = {
	args: {
		text: "Googleでログイン",
		variant: "default",
		isBlock: false,
	},
};

// アウトラインバリアント
export const OutlineVariant: Story = {
	args: {
		text: "Googleでログイン",
		variant: "outline",
		isBlock: false,
	},
};

// カスタムテキスト
export const CustomText: Story = {
	args: {
		text: "Googleアカウントで登録",
		variant: "outline",
		isBlock: false,
	},
};

// ローディング状態
export const Loading: Story = {
	args: {
		text: "Googleでログイン",
		variant: "outline",
		isBlock: false,
	},
};

// モバイル表示
export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
	args: {
		text: "Googleでログイン",
		variant: "outline",
		isBlock: true,
	},
};

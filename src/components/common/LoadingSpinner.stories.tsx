import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "./LoadingSpinner";

const meta = {
	title: "Components/Common/LoadingSpinner",
	component: LoadingSpinner,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		size: {
			control: "radio",
			options: ["sm", "md", "lg"],
			defaultValue: "md",
		},
	},
	decorators: [
		(Story) => (
			<div className="p-4 flex items-center justify-center">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（中サイズ）
export const Default: Story = {};

// 小サイズ
export const Small: Story = {
	args: {
		size: "sm",
	},
};

// 中サイズ
export const Medium: Story = {
	args: {
		size: "md",
	},
};

// 大サイズ
export const Large: Story = {
	args: {
		size: "lg",
	},
};

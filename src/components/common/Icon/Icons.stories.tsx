import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "./Icons";

const meta = {
	title: "Components/Common/Icons",
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className="flex gap-4 p-4">
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj;

// すべてのアイコンを表示
export const AllIcons: Story = {
	render: () => (
		<div className="grid grid-cols-3 gap-4">
			{Object.entries(Icons).map(([name, Icon]) => (
				<div
					key={name}
					className="flex flex-col items-center gap-2 p-4 border rounded"
				>
					<Icon className="h-6 w-6" />
					<span className="text-sm">{name}</span>
				</div>
			))}
		</div>
	),
};

// 個別のアイコン
export const Spinner: Story = {
	render: () => <Icons.spinner className="h-6 w-6 animate-spin" />,
};

export const User: Story = {
	render: () => <Icons.user className="h-6 w-6" />,
};

export const Upload: Story = {
	render: () => <Icons.upload className="h-6 w-6" />,
};

export const Close: Story = {
	render: () => <Icons.close className="h-6 w-6" />,
};

export const Google: Story = {
	render: () => <Icons.google className="h-6 w-6" />,
};

// サイズバリエーション
export const IconSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icons.user className="h-4 w-4" />
			<Icons.user className="h-6 w-6" />
			<Icons.user className="h-8 w-8" />
			<Icons.user className="h-10 w-10" />
		</div>
	),
};

// カラーバリエーション
export const IconColors: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icons.user className="h-6 w-6 text-primary" />
			<Icons.user className="h-6 w-6 text-destructive" />
			<Icons.user className="h-6 w-6 text-muted-foreground" />
			<Icons.user className="h-6 w-6 text-blue-500" />
		</div>
	),
};

// アニメーション例
export const AnimatedIcons: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Icons.spinner className="h-6 w-6 animate-spin" />
			<Icons.upload className="h-6 w-6 animate-bounce" />
			<Icons.close className="h-6 w-6 animate-pulse" />
		</div>
	),
};

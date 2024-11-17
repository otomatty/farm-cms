import type { Meta, StoryObj } from "@storybook/react";
import { SignUpForm } from "./SignUpForm";
import { MockProviders } from "@/test/mockProviders";

const meta = {
	title: "Forms/Auth/SignUpForm",
	component: SignUpForm,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<MockProviders>
				<div className="w-full max-w-md p-4">
					<Story />
				</div>
			</MockProviders>
		),
	],
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// 送信中の状態
export const Loading: Story = {
	parameters: {
		mockData: {
			isLoading: true,
		},
	},
};

// エラー状態
export const WithError: Story = {
	parameters: {
		mockData: {
			error: {
				message: "User already registered",
			},
		},
	},
};

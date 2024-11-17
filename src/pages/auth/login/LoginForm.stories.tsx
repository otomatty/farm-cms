import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { MockProviders } from "@/test/mockProviders";

const meta = {
	title: "Forms/Auth/LoginForm",
	component: LoginForm,
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
} satisfies Meta<typeof LoginForm>;

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
				message: "Invalid credentials",
			},
		},
	},
};

// 入力済み状態
export const Filled: Story = {
	args: {
		defaultValues: {
			email: "test@example.com",
			password: "password123",
		},
	},
};

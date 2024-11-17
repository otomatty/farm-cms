import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { MockProviders } from "@/test/mockProviders";
import { fn } from "@storybook/test";

const meta = {
	title: "Forms/Auth/ResetPasswordForm",
	component: ResetPasswordForm,
	parameters: {
		layout: "centered",
	},
	args: {
		onSuccess: fn(),
		onError: fn(),
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
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	parameters: {
		mockData: {
			isLoading: true,
		},
	},
};

export const WithError: Story = {
	parameters: {
		mockData: {
			error: {
				message: "User not found",
			},
		},
	},
};

export const Filled: Story = {
	args: {
		onSuccess: fn(),
		onError: fn(),
		defaultValues: {
			email: "test@example.com",
		},
	},
};

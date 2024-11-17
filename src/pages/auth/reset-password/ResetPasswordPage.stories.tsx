import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { MockProviders } from "@/test/mockProviders";

const meta = {
	title: "Pages/Auth/ResetPasswordPage",
	component: ResetPasswordPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<MockProviders>
				<Story />
			</MockProviders>
		),
	],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

export const Tablet: Story = {
	parameters: {
		viewport: {
			defaultViewport: "tablet",
		},
	},
};

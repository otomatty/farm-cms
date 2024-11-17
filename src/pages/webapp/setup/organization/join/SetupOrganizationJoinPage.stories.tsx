import type { Meta, StoryObj } from "@storybook/react";
import { SetupOrganizationJoinPage } from "./SetupOrganizationJoinPage";
import SetupLayout from "@/components/webapp/layouts/SetupLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "WebApp/Pages/SetupOrganizationJoinPage",
	component: SetupOrganizationJoinPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="h-screen">
					<SetupLayout>
						<Story />
					</SetupLayout>
				</div>
			</BrowserRouter>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof SetupOrganizationJoinPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（空のフォーム）
export const Default: Story = {};

// 入力済みのストーリー
export const FilledForm: Story = {
	args: {
		initialInviteCode: "INVITE123",
	},
};

// ローディング状態のストーリー
export const Loading: Story = {
	args: {
		isLoading: true,
		initialInviteCode: "INVITE123",
	},
};

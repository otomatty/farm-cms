import type { Meta, StoryObj } from "@storybook/react";
import { SetupOrganizationCreatePage } from "./SetupOrganizationCreatePage";
import SetupLayout from "@/components/webapp/layouts/SetupLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "WebApp/Pages/SetupOrganizationCreatePage",
	component: SetupOrganizationCreatePage,
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
} satisfies Meta<typeof SetupOrganizationCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（空のフォーム）
export const Default: Story = {};

// 入力済みのフォームのストーリー
export const FilledForm: Story = {
	args: {
		initialFormData: {
			name: "株式会社サンプル",
			description:
				"サンプル企業の説明文です。\nこちらは複数行の説明文になります。",
		},
	},
};

// ローディング状態のストーリー
export const Loading: Story = {
	args: {
		isLoading: true,
		initialFormData: {
			name: "株式会社サンプル",
			description: "サンプル企業の説明文です。",
		},
	},
};

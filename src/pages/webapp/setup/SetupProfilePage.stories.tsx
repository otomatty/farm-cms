import type { Meta, StoryObj } from "@storybook/react";
import { SetupProfilePage } from "./SetupProfilePage";
import SetupLayout from "@/components/webapp/layouts/SetupLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "WebApp/Pages/SetupProfilePage",
	component: SetupProfilePage,
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
} satisfies Meta<typeof SetupProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（空のフォーム）
export const Default: Story = {};

// 入力済みのフォームのストーリー
export const FilledForm: Story = {
	args: {
		initialFormData: {
			fullName: "山田 太郎",
			phoneNumber: "090-1234-5678",
			bio: "はじめまして。山田太郎です。\nよろしくお願いいたします。",
		},
	},
};

// ローディング状態のストーリー
export const Loading: Story = {
	args: {
		isLoading: true,
		initialFormData: {
			fullName: "山田 太郎",
			phoneNumber: "090-1234-5678",
			bio: "はじめまして。山田太郎です。",
		},
	},
};

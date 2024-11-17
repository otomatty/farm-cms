import type { Meta, StoryObj } from "@storybook/react";
import { DashboardPage } from "./DashboardPage";
import AppLayout from "@/components/webapp/layouts/AppLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "WebApp/Pages/DashboardPage",
	component: DashboardPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="h-screen">
					<AppLayout>
						<Story />
					</AppLayout>
				</div>
			</BrowserRouter>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なストーリー
export const Default: Story = {};

// ローディング状態
export const Loading: Story = {
	decorators: [
		(Story) => (
			<div className="animate-pulse">
				<Story />
			</div>
		),
	],
};

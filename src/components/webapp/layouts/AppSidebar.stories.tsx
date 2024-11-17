import type { Meta, StoryObj } from "@storybook/react";
import { AppSidebar } from "./AppSidebar";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// サイドバーを表示するためのラッパーコンポーネント
const SidebarWrapper = ({
	children,
	isCollapsed = false,
	showAdminMenu = false,
}: {
	children: React.ReactNode;
	isCollapsed?: boolean;
	showAdminMenu?: boolean;
}) => (
	<div
		className="flex h-screen"
		data-collapsed={isCollapsed}
		data-admin={showAdminMenu}
	>
		{children}
		<div className="flex-1 bg-muted/10 p-4">
			<h1 className="text-2xl font-bold mb-4">メインコンテンツエリア</h1>
			<p className="text-muted-foreground">
				サイドバーの動作を確認するためのダミーコンテンツです。
			</p>
		</div>
	</div>
);

const meta = {
	title: "Components/WebApp/Layouts/AppSidebar",
	component: AppSidebar,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<SidebarProvider>
					<SidebarWrapper>
						<Story />
					</SidebarWrapper>
				</SidebarProvider>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// 管理者メニュー表示
export const AdminView: Story = {
	render: () => (
		<SidebarWrapper showAdminMenu={true}>
			<AppSidebar />
		</SidebarWrapper>
	),
};

// コラップス状態
export const Collapsed: Story = {
	render: () => (
		<SidebarWrapper isCollapsed={true}>
			<AppSidebar />
		</SidebarWrapper>
	),
};

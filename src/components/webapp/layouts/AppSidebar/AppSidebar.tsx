import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
	SidebarRail,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { data } from "./sidebar.data";
import { OrganizationSwitcher } from "./_components/OrganizationSwitcher";
import { MainMenu } from "./_components/MainMenu";
import { CommonMenu } from "./_components/CommonMenu";
import { UserMenu } from "./_components/UserMenu";
import { AdminMenu } from "./_components/AdminMenu";
import { useAtomValue } from "jotai";
import { currentOrganizationRoleAtom } from "@/stores/organizationAtom";

export const AppSidebar = () => {
	// 管理者メニューの表示状態を管理
	const [showAdminMenu, setShowAdminMenu] = React.useState(false);
	// 仮の管理者フラグ（実際の実装では認証情報から取得）
	const currentRole = useAtomValue(currentOrganizationRoleAtom);
	const isAdmin = currentRole === "owner" || currentRole === "admin";

	// 管理者メニューの切り替え
	const toggleAdminMenu = () => {
		setShowAdminMenu((prev) => !prev);
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<OrganizationSwitcher />
			</SidebarHeader>

			<SidebarContent>
				{/* メニューの条件付きレンダリング */}
				{showAdminMenu ? (
					<AdminMenu isAdmin={isAdmin} />
				) : (
					<>
						<MainMenu
							menuItems={data.menuItems}
							userPreferences={[
								"announcements",
								"blogs",
								"events",
								"testimonials",
								"gallery",
								"news",
								"recruitment",
								"inquiries",
								"products",
								"faqs",
							]}
						/>
						<Separator />
						<CommonMenu />
					</>
				)}

				{/* 管理者の場合のみ切り替えボタンを表示（最下部に配置） */}
				{isAdmin && (
					<SidebarMenu className="mt-auto">
						<SidebarMenuItem>
							<Button
								variant={showAdminMenu ? "secondary" : "ghost"}
								className="w-full justify-start"
								onClick={toggleAdminMenu}
							>
								<Settings className="mr-2 h-4 w-4" />
								{showAdminMenu ? "通常メニューに戻る" : "システム管理"}
							</Button>
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarContent>

			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
};

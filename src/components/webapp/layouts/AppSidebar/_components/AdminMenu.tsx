import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Users, Settings, Shield, FileText, History, Plug } from "lucide-react";
import { Link } from "react-router-dom";

// 管理者メニューアイテムの型定義
type AdminMenuItem = {
	icon: React.ElementType;
	label: string;
	href: string;
	children?: Omit<AdminMenuItem, "children">[];
};

// 管理者メニューアイテムの定義
const adminMenuItems: AdminMenuItem[] = [
	{
		icon: Users,
		label: "ユーザー管理",
		href: "/webapp/admin/users",
		children: [
			{
				icon: Users,
				label: "ユーザー一覧",
				href: "/webapp/admin/users",
			},
			{
				icon: Users,
				label: "招待管理",
				href: "/webapp/admin/users/invitations",
			},
		],
	},
	{
		icon: FileText,
		label: "コンテンツ管理",
		href: "/webapp/admin/contents",
		children: [
			{
				icon: Settings,
				label: "コンテンツ設定",
				href: "/webapp/admin/contents",
			},
			{
				icon: Shield,
				label: "権限設定",
				href: "/webapp/admin/contents/permissions",
			},
		],
	},
	{
		icon: Settings,
		label: "組織設定",
		href: "/webapp/admin/settings",
	},
	{
		icon: Shield,
		label: "セキュリティ",
		href: "/webapp/admin/security",
	},
	{
		icon: History,
		label: "監査ログ",
		href: "/webapp/admin/audit",
	},
	{
		icon: Plug,
		label: "連携設定",
		href: "/webapp/admin/integrations",
	},
];

type AdminMenuProps = {
	isAdmin: boolean;
};

export const AdminMenu = ({ isAdmin }: AdminMenuProps) => {
	if (!isAdmin) return null;

	return (
		<SidebarGroup>
			<SidebarGroupLabel>システム管理</SidebarGroupLabel>
			<SidebarMenu>
				{adminMenuItems.map((item) => {
					const Icon = item.icon;

					if (item.children) {
						return (
							<SidebarMenuItem key={item.href}>
								<SidebarGroupLabel className="flex items-center">
									<Icon className="mr-2 h-4 w-4" />
									{item.label}
								</SidebarGroupLabel>
								<SidebarMenu className="ml-6">
									{item.children.map((child) => {
										const ChildIcon = child.icon;
										return (
											<SidebarMenuItem key={child.href}>
												<SidebarMenuButton
													className="w-full justify-start"
													asChild
												>
													<Link to={child.href}>
														<ChildIcon className="mr-2 h-4 w-4" />
														{child.label}
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarMenuItem>
						);
					}

					return (
						<SidebarMenuItem key={item.href}>
							<SidebarMenuButton className="w-full justify-start" asChild>
								<Link to={item.href}>
									<Icon className="mr-2 h-4 w-4" />
									{item.label}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
};

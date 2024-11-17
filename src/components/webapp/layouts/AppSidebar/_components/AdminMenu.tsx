import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Users, Building2, Shield, Database, History } from "lucide-react";
import { Link } from "react-router-dom";

// 管理者メニューアイテムの型定義
type AdminMenuItem = {
	icon: React.ElementType;
	label: string;
	href: string;
};

// 管理者メニューアイテムの定義
const adminMenuItems: AdminMenuItem[] = [
	{
		icon: Users,
		label: "ユーザー管理",
		href: "/webapp/admin/users",
	},
	{
		icon: Building2,
		label: "組織管理",
		href: "/webapp/admin/organizations",
	},
	{
		icon: Shield,
		label: "権限管理",
		href: "/webapp/admin/roles",
	},
	{
		icon: Database,
		label: "マスターデータ",
		href: "/webapp/admin/master-data",
	},
	{
		icon: History,
		label: "監査ログ",
		href: "/webapp/admin/audit-logs",
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

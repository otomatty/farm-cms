import { Link } from "react-router-dom";
import { Scroll, Settings } from "lucide-react";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

export const CommonMenu = () => {
	return (
		<SidebarGroup>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/webapp/guides">
							<Scroll className="mr-2 h-4 w-4" />
							<span className="flex-1">使い方ガイド</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/webapp/settings">
							<Settings className="mr-2 h-4 w-4" />
							<span className="flex-1">設定</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
};

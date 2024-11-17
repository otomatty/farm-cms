import { Plus } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>クイックアクション</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Button variant="secondary" className="w-full justify-start">
							<Plus className="mr-2 h-4 w-4" />
							新規プロジェクト
						</Button>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
};

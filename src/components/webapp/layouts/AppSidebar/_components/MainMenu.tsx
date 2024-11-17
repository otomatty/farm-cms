import { Link, useParams } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "../types";

// ユーザーの選択に基づいてメニュー項目をフィルタリング
const filterMenuItemsForUser = (
	menuItems: MenuItem[],
	userPreferences: string[],
) => {
	return menuItems.filter((item) => userPreferences.includes(item.id));
};

interface MainMenuProps {
	menuItems: MenuItem[];
	userPreferences: string[]; // ユーザーの選択を示す配列を追加
}

export const MainMenu = ({ menuItems, userPreferences }: MainMenuProps) => {
	const params = useParams();
	const filteredMenuItems = filterMenuItemsForUser(menuItems, userPreferences);

	return (
		<>
			<SidebarGroup>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link to="/webapp">
								<Home className="h-4 w-4" />
								<span>ホーム</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<Separator />
			<SidebarGroup>
				<SidebarGroupLabel>コンテンツ</SidebarGroupLabel>
				<SidebarMenu>
					{filteredMenuItems.map((item) => {
						const isActive = params.path === item.path;
						return (
							<Collapsible
								key={item.path}
								asChild
								defaultOpen={isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									{item.items ? (
										<>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton tooltip={item.title}>
													<item.icon className="h-4 w-4" />
													<span>{item.title}</span>
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items.map((subItem) => (
														<SidebarMenuSubItem key={subItem.path}>
															<SidebarMenuSubButton
																asChild
																isActive={params.path === subItem.path}
															>
																<Link to={subItem.path}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</>
									) : (
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.title}
										>
											<Link to={item.path}>
												<item.icon className="h-4 w-4" />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							</Collapsible>
						);
					})}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
};

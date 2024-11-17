import { Building2, ChevronsUpDown, Plus } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OrganizationSwitcher = () => {
	const navigate = useNavigate();
	const {
		currentOrganization,
		organizations,
		loadOrganizations,
		switchOrganization,
	} = useOrganizationSwitcher();

	useEffect(() => {
		loadOrganizations();
	}, [loadOrganizations]);

	if (!organizations.length || !currentOrganization) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Building2 className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{currentOrganization.name}
								</span>
								<span className="truncate text-xs">
									{currentOrganization.rg_number}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							組織
						</DropdownMenuLabel>
						{organizations.map((org, index) => (
							<DropdownMenuItem
								key={org.id}
								onClick={() => switchOrganization(org)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<Building2 className="size-4 shrink-0" />
								</div>
								{org.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 p-2"
							onClick={() => navigate("/webapp/organizations/new")}
						>
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">
								組織を追加
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

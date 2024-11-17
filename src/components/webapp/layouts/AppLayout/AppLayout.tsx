import { AppHeader } from "../AppHeader/AppHeader";
import { AppSidebar } from "../AppSidebar/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

type AppLayoutProps = {
	children?: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<main className="p-4 mx-8 lg:mx-16">{children || <Outlet />}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

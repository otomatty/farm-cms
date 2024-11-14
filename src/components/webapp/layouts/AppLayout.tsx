import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
const AppLayout: React.FC = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<main>
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default AppLayout;

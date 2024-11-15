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
				<main className="p-4 mx-8 lg:mx-16">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default AppLayout;

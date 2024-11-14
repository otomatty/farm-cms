import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export const SiteLayout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<SiteHeader />
			<main className="flex-grow">
				<Outlet />
			</main>
			<SiteFooter />
		</div>
	);
};

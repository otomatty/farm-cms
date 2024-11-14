import type { RouteObject } from "react-router-dom";
import { SiteLayout } from "@/components/site/layouts/SiteLayout";
import { HomePage } from "@/pages/site/home/HomePage";
import { AboutPage } from "@/pages/site/about/AboutPage";
import { ContactPage } from "@/pages/site/contact/ContactPage";
import { NotFoundPage } from "@/pages/error/NotFoundPage";

export const siteRoutes: RouteObject[] = [
	{
		element: <SiteLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
];

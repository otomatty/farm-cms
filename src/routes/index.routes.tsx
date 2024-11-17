import { createBrowserRouter } from "react-router-dom";
import { webappRoutes } from "./webapp.routes";
import { siteRoutes } from "./site.routes";
import { authRoutes } from "./auth.routes";
import { setupRoutes } from "./setup.routes";

type ExtendedFutureConfig = {
	v7_startTransition: boolean;
	v7_relativeSplatPath: boolean;
	v7_fetcherPersist: boolean;
	v7_normalizeFormMethod: boolean;
	v7_partialHydration: boolean;
	v7_skipActionErrorRevalidation: boolean;
};

export const router = createBrowserRouter(
	[...webappRoutes, ...siteRoutes, ...authRoutes, ...setupRoutes],
	{
		future: {
			v7_startTransition: true,
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true,
		} as ExtendedFutureConfig,
	},
);

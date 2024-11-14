import { createBrowserRouter } from "react-router-dom";
import { webappRoutes } from "./webapp";
import { siteRoutes } from "./site";
import { authRoutes } from "./auth";

export const router = createBrowserRouter([
	...webappRoutes,
	...siteRoutes,
	...authRoutes,
]);

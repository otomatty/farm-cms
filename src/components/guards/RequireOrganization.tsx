import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";

export const RequireOrganization = () => {
	const location = useLocation();
	const { currentOrganization } = useOrganizationSwitcher();

	if (!currentOrganization) {
		return (
			<Navigate
				to="/webapp/organizations"
				state={{ returnPath: location.pathname }}
				replace
			/>
		);
	}

	return <Outlet />;
};

import { useAtomValue } from "jotai";
import { currentOrganizationRoleAtom } from "@/stores/organizationAtom";
import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard = () => {
	const currentRole = useAtomValue(currentOrganizationRoleAtom);
	const isAdmin = currentRole === "owner" || currentRole === "admin";

	if (!isAdmin) {
		return <Navigate to="/webapp" replace />;
	}

	return <Outlet />;
};

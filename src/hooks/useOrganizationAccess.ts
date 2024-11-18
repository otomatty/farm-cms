import { useCallback } from "react";
import { useOrganizationSwitcher } from "./useOrganizationSwitcher";
import { useOrganization } from "./useOrganization";

export const useOrganizationAccess = () => {
	const { currentOrganization } = useOrganizationSwitcher();
	const { getUserRole } = useOrganization();

	const checkAccess = useCallback(async () => {
		if (!currentOrganization) return false;
		const role = await getUserRole(currentOrganization.id);
		return role === "owner" || role === "admin";
	}, [currentOrganization, getUserRole]);

	return { checkAccess };
};

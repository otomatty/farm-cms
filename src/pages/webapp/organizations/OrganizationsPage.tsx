import { useEffect } from "react";
import { OrganizationsHeader } from "./components/OrganizationsHeader";
import { OrganizationsTable } from "./components/OrganizationsTable";
import { OrganizationsEmptyState } from "./components/OrganizationsEmptyState";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";

export const OrganizationsPage = () => {
	const { organizations, loadOrganizations } = useOrganizationSwitcher();

	useEffect(() => {
		loadOrganizations();
	}, [loadOrganizations]);

	return (
		<div className="space-y-6 p-6">
			<OrganizationsHeader />
			{organizations.length > 0 ? (
				<OrganizationsTable organizations={organizations} />
			) : (
				<OrganizationsEmptyState />
			)}
		</div>
	);
};

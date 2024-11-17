import { useEffect } from "react";
import { OrganizationsHeader } from "./_components/OrganizationsHeader";
import { OrganizationsTable } from "./_components/OrganizationsTable";
import { OrganizationsEmptyState } from "./_components/OrganizationsEmptyState";
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

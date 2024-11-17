import { PageHeader } from "./components/PageHeader/PageHeader";
import { MembersTable } from "./components/MembersTable/MembersTable";

// TODO: hooks/useOrganizationMembers.tsでメンバー管理のカスタムフック実装
// TODO: services/organizationService.tsでAPIリクエスト処理実装

const OrganizationMembersPage = () => {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<PageHeader />
			<MembersTable />
		</div>
	);
};

export default OrganizationMembersPage;

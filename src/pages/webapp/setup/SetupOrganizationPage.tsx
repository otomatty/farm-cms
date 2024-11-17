import { BackLink } from "@/components/common/navigation/BackLink";
import { OrganizationActionCards } from "@/components/webapp/organization/OrganizationActionCards";

export const SetupOrganizationPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="mb-8">
					<BackLink to="/webapp/setup" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">組織設定</h1>

				<OrganizationActionCards
					createPath="/webapp/setup/organization/create"
					joinPath="/webapp/setup/organization/join"
				/>
			</div>
		</div>
	);
};

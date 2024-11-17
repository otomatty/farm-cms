import { BackLink } from "@/components/common/BackLink/BackLink";
import { OrganizationActionCards } from "@/components/webapp/organization/OrganizationActionCards";

export const OrganizationNewPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="mb-8">
					<BackLink to="/webapp/organizations" label="組織一覧に戻る" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">組織の追加</h1>

				<OrganizationActionCards
					createPath="/webapp/organization/create"
					joinPath="/webapp/organization/join"
				/>
			</div>
		</div>
	);
};

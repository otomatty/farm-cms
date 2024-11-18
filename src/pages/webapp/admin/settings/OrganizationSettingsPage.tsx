import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationSettingsForm } from "./_components/OrganizationSettingsForm";

export const OrganizationSettingsPage = () => {
	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="組織設定"
				description="組織の基本設定を管理します"
			/>
			<Card>
				<CardHeader>
					<CardTitle>基本情報</CardTitle>
				</CardHeader>
				<CardContent>
					<OrganizationSettingsForm />
				</CardContent>
			</Card>
		</div>
	);
};

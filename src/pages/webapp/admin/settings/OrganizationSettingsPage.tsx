import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useOrganizationSettings } from "./_hooks/useOrganizationSettings";

export const OrganizationSettingsPage = () => {
	const { form } = useOrganizationSettings();

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
					<Form {...form}>{/* フォームフィールドの実装 */}</Form>
				</CardContent>
			</Card>
		</div>
	);
};

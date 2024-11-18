import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationSettingsForm } from "./_components/OrganizationSettingsForm";

export const OrganizationSettingsPage = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">組織設定</h1>
				<p className="text-sm text-muted-foreground">
					組織の基本設定を管理します
				</p>
			</div>
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

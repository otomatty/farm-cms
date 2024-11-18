import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SecuritySettingsForm } from "./_components/SecuritySettingsForm";
import { MfaSettings } from "./_components/MfaSettings";
import { SessionSettings } from "./_components/SessionSettings";

export const SecuritySettingsPage = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">セキュリティ設定</h1>
				<p className="text-sm text-muted-foreground">
					組織のセキュリティポリシーを管理します
				</p>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>パスワードポリシー</CardTitle>
					</CardHeader>
					<CardContent>
						<SecuritySettingsForm />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>二要素認証</CardTitle>
					</CardHeader>
					<CardContent>
						<MfaSettings />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>セッション管理</CardTitle>
					</CardHeader>
					<CardContent>
						<SessionSettings />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

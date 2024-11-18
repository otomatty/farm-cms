import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import * as Icons from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useContentSettings } from "./_hooks/useContentSettings";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";
import { useOrganizationAccess } from "@/hooks/useOrganizationAccess";

export const ContentSettingsPage = () => {
	const { currentOrganization } = useOrganizationSwitcher();
	const { checkAccess } = useOrganizationAccess();
	const { settings, isLoading, updateSettings, initializeSettings } =
		useContentSettings(currentOrganization?.id ?? "");

	// 初期設定の確認
	useEffect(() => {
		if (currentOrganization && settings.length === 0) {
			initializeSettings().catch((error) => {
				console.error("Failed to initialize settings:", error);
			});
		}
	}, [currentOrganization, settings.length, initializeSettings]);

	// 組織が選択されていない場合
	if (!currentOrganization) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>エラー</AlertTitle>
				<AlertDescription>
					組織が選択されていません。組織を選択してください。
				</AlertDescription>
			</Alert>
		);
	}

	// ローディング中
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<LoadingSpinner />
			</div>
		);
	}

	// アクセス権限がない場合
	if (!checkAccess()) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>アクセス拒否</AlertTitle>
				<AlertDescription>
					このページにアクセスする権限がありません。
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">コンテンツ設定</h1>
					<p className="text-sm text-muted-foreground">
						管理可能なコンテンツタイプを設定します
					</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>コンテンツタイプ</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{settings.length === 0 ? (
						<div className="text-center text-muted-foreground py-4">
							設定可能なコンテンツタイプがありません
						</div>
					) : (
						settings.map((setting) => {
							const IconComponent = Icons[
								setting.icon as keyof typeof Icons
							] as LucideIcon;
							return (
								<div
									key={setting.id}
									className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="flex items-center gap-3">
										{IconComponent && (
											<div className="flex-shrink-0">
												<IconComponent className="w-5 h-5 text-muted-foreground" />
											</div>
										)}
										<div>
											<h4 className="font-medium text-foreground">
												{setting.name}
											</h4>
											<p className="text-sm text-muted-foreground">
												{setting.description}
											</p>
										</div>
									</div>
									<Switch
										checked={setting.enabled}
										onCheckedChange={(checked) =>
											updateSettings(setting.id, checked)
										}
										aria-label={`${setting.name}の有効/無効を切り替え`}
									/>
								</div>
							);
						})
					)}
				</CardContent>
			</Card>
		</div>
	);
};

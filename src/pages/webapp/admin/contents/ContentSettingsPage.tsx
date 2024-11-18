import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useContentSettings } from "./_hooks/useContentSettings";

export const ContentSettingsPage = () => {
	const { settings, updateSettings } = useContentSettings();

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="コンテンツ設定"
				description="管理可能なコンテンツタイプを設定します"
			/>
			<Card>
				<CardHeader>
					<CardTitle>コンテンツタイプ</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{settings.map((setting) => (
						<div key={setting.id} className="flex items-center justify-between">
							<div>
								<h4 className="font-medium">{setting.name}</h4>
								<p className="text-sm text-muted-foreground">
									{setting.description}
								</p>
							</div>
							<Switch
								checked={setting.enabled}
								onCheckedChange={(checked) =>
									updateSettings(setting.id, checked)
								}
							/>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

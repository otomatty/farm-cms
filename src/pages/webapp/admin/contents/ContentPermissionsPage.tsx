import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useContentPermissions } from "./_hooks/useContentPermissions";

export const ContentPermissionsPage = () => {
	const { permissions, updatePermission } = useContentPermissions();

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="コンテンツ権限"
				description="各コンテンツタイプの編集権限を設定します"
			/>
			<Card>
				<CardHeader>
					<CardTitle>権限設定</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{permissions.map((permission) => (
						<div
							key={permission.id}
							className="flex items-center justify-between"
						>
							<div>
								<h4 className="font-medium">{permission.contentType}</h4>
								<p className="text-sm text-muted-foreground">
									編集可能なロール
								</p>
							</div>
							<Select
								value={permission.role}
								onValueChange={(value) =>
									updatePermission(permission.id, value)
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="ロールを選択" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="owner">オーナーのみ</SelectItem>
									<SelectItem value="admin">管理者以上</SelectItem>
									<SelectItem value="member">全メンバー</SelectItem>
								</SelectContent>
							</Select>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

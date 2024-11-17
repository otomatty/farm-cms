import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrganizationsHeader = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">組織管理</h1>
				<p className="text-sm text-muted-foreground">
					所属している組織の一覧と管理を行えます。
				</p>
			</div>
			<Button onClick={() => navigate("/webapp/organizations/new")}>
				<Plus className="mr-2 size-4" />
				組織を追加
			</Button>
		</div>
	);
};

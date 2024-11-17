import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrganizationsEmptyState = () => {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
			<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
				<Building2 className="size-6 text-muted-foreground" />
			</div>
			<h3 className="mt-4 text-lg font-semibold">組織が未登録です</h3>
			<p className="mb-4 mt-2 text-sm text-muted-foreground">
				新しい組織を作成するか、既存の組織に参加してください。
			</p>
			<div className="flex gap-2">
				<Button onClick={() => navigate("/webapp/organizations/new")}>
					組織を作成
				</Button>
				<Button
					variant="outline"
					onClick={() => navigate("/webapp/organizations/join")}
				>
					組織に参加
				</Button>
			</div>
		</div>
	);
};

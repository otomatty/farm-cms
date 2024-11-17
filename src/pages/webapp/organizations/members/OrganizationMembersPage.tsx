import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useNavigate } from "react-router-dom";

// TODO: types/organization.tsで型定義
// TODO: hooks/useOrganizationMembers.tsでメンバー管理のカスタムフック実装
// TODO: services/organizationService.tsでAPIリクエスト処理実装

const OrganizationMembersPage = () => {
	const navigate = useNavigate();

	const columns = [
		{ header: "名前", accessorKey: "name" },
		{ header: "メールアドレス", accessorKey: "email" },
		{ header: "役割", accessorKey: "role" },
		{ header: "参加日", accessorKey: "joinedAt" },
		{ header: "アクション", accessorKey: "actions" },
	];

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">メンバー管理</h1>
				<Button onClick={() => navigate("../invite")}>新規メンバー招待</Button>
			</div>

			<DataTable
				columns={columns}
				data={[]} // TODO: メンバーデータ
			/>
		</div>
	);
};

export default OrganizationMembersPage;

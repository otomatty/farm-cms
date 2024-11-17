import { DataTable } from "@/components/ui/data-table";

// TODO: types/invite.tsで型定義
// TODO: hooks/useInvitations.tsで招待一覧管理のカスタムフック実装
// TODO: services/inviteService.tsでAPIリクエスト処理実装

const InvitationsManagementPage = () => {
	const columns = [
		{ header: "メールアドレス", accessorKey: "email" },
		{ header: "ステータス", accessorKey: "status" },
		{ header: "有効期限", accessorKey: "expiresAt" },
		{ header: "作成日", accessorKey: "createdAt" },
		{ header: "アクション", accessorKey: "actions" },
	];

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-2xl font-bold mb-6">招待管理</h1>

			<DataTable
				columns={columns}
				data={[]} // TODO: 招待データ
			/>
		</div>
	);
};

export default InvitationsManagementPage;

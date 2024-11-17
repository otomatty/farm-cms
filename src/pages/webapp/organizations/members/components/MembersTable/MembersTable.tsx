import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export const MembersTable = () => {
	// TODO: メンバーデータの取得
	const members = [];

	return (
		<div className="rounded-md border">
			<DataTable
				columns={columns}
				data={members}
				emptyState={
					<div className="text-center py-8 text-muted-foreground">
						メンバーが登録されていません
					</div>
				}
			/>
		</div>
	);
};

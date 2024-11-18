import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./_components/columns";
import { useUsers } from "./_hooks/useUsers";

export const UsersPage = () => {
	const { users, isLoading } = useUsers();

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="ユーザー管理"
				description="組織のメンバーを管理します"
				action={
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						ユーザーを招待
					</Button>
				}
			/>
			<DataTable columns={columns} data={users} isLoading={isLoading} />
		</div>
	);
};

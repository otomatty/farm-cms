import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useUsers } from "./_hooks/useUsers";
import { UsersTable } from "./_components/UsersTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const UsersPage = () => {
	const {
		users,
		isLoading,
		selectedUsers,
		setSelectedUsers,
		updateRole,
		removeUsers,
	} = useUsers();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">ユーザー管理</h1>
					<p className="text-sm text-muted-foreground">
						組織のメンバーを管理します
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					ユーザーを招待
				</Button>
			</div>

			{updateRole.error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>エラー</AlertTitle>
					<AlertDescription>
						ユーザー情報の更新に失敗しました。しばらく経ってから再度お試しください。
					</AlertDescription>
				</Alert>
			)}

			<UsersTable
				data={users}
				isLoading={isLoading}
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
				onUpdateRole={updateRole.mutate}
				onRemoveUsers={removeUsers.mutate}
			/>
		</div>
	);
};

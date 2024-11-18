import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { OrganizationMember } from "@/types/organization";

export const columns: ColumnDef<OrganizationMember>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="全て選択"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="行を選択"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="名前" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={row.original.profileImage} />
						<AvatarFallback>{row.original.name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium">{row.original.name}</span>
						<span className="text-sm text-muted-foreground">
							{row.original.email}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ロール" />
		),
		cell: ({ row }) => {
			const role = row.original.role;
			return (
				<Badge variant={role === "owner" ? "default" : "secondary"}>
					{role === "owner"
						? "オーナー"
						: role === "admin"
							? "管理者"
							: "メンバー"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "joinedAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="参加日" />
		),
		cell: ({ row }) => {
			return format(new Date(row.original.joinedAt), "yyyy年MM月dd日", {
				locale: ja,
			});
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];

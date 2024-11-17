import type { ColumnDef } from "@tanstack/react-table";
import type { OrganizationMemberRow } from "@/types/organization";
import { MemberRoleCell } from "./MemberRoleCell";
import { MemberActionsCell } from "./MemberActionsCell";

export const columns: ColumnDef<OrganizationMemberRow>[] = [
	{
		accessorKey: "name",
		header: "名前",
	},
	{
		accessorKey: "email",
		header: "メールアドレス",
	},
	{
		accessorKey: "role",
		header: "役割",
		cell: ({ row }) => <MemberRoleCell member={row.original} />,
	},
	{
		accessorKey: "joinedAt",
		header: "参加日",
		cell: ({ row }) => {
			return new Date(row.original.joinedAt).toLocaleDateString("ja-JP");
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <MemberActionsCell member={row.original} />,
	},
];

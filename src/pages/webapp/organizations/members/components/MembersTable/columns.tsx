import type { ColumnDef } from "@tanstack/react-table";
import { MemberRoleCell } from "./MemberRoleCell";
import { MemberActionsCell } from "./MemberActionsCell";

// TODO: types/organization.tsで型定義
type Member = {
	id: string;
	name: string;
	email: string;
	role: string;
	joinedAt: string;
};

export const columns: ColumnDef<Member>[] = [
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
			return new Date(row.original.joinedAt).toLocaleDateString();
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <MemberActionsCell member={row.original} />,
	},
];

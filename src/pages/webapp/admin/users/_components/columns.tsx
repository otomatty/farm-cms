"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: 後でスキーマ定義から型をインポートする
export type User = {
	id: string;
	email: string;
	name: string;
	role: "admin" | "user";
	createdAt: string;
};

export const columns: ColumnDef<User>[] = [
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
		header: "権限",
		cell: ({ row }) => {
			const role = row.getValue("role") as string;
			return role === "admin" ? "管理者" : "一般ユーザー";
		},
	},
	{
		accessorKey: "createdAt",
		header: "登録日",
		cell: ({ row }) => {
			return new Date(row.getValue("createdAt")).toLocaleDateString("ja-JP");
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">メニューを開く</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>アクション</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(user.id)}
						>
							IDをコピー
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>編集</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600">削除</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

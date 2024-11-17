"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { News } from "../types";

export const columns: ColumnDef<News>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					タイトル
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: "ステータス",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<Badge variant={status === "published" ? "default" : "secondary"}>
					{status === "published" ? "公開" : "下書き"}
				</Badge>
			);
		},
	},
	{
		accessorKey: "published_at",
		header: "公開日時",
		cell: ({ row }) => {
			const date = row.getValue("published_at") as string;
			if (!date) return "-";
			return format(new Date(date), "yyyy/MM/dd HH:mm", { locale: ja });
		},
	},
	{
		accessorKey: "is_important",
		header: "重要",
		cell: ({ row }) => {
			const isImportant = row.getValue("is_important") as boolean;
			return isImportant ? (
				<Badge variant="destructive">重要</Badge>
			) : (
				<Badge variant="outline">通常</Badge>
			);
		},
	},
];

import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon, SlidersHorizontal } from "lucide-react";
import type { Table, ColumnDef } from "@tanstack/react-table";
import type { News } from "../types";

interface NewsTableProps {
	data: News[];
	onEdit: (news: News) => void;
	onDelete: (id: number) => Promise<void>;
}

interface NewsTableToolbarProps<TData> {
	table: Table<TData>;
}

// テーブルのツールバーコンポーネント
function NewsTableToolbar<TData>({ table }: NewsTableToolbarProps<TData>) {
	return (
		<div className="flex items-center justify-between mb-4">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="タイトルで検索..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>

				{/* ステータスフィルター */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-8">
							<FilterIcon className="mr-2 h-4 w-4" />
							ステータス
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuCheckboxItem
							checked={
								table.getColumn("status")?.getFilterValue() === "published"
							}
							onCheckedChange={() =>
								table.getColumn("status")?.setFilterValue("published")
							}
						>
							公開中
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={table.getColumn("status")?.getFilterValue() === "draft"}
							onCheckedChange={() =>
								table.getColumn("status")?.setFilterValue("draft")
							}
						>
							下書き
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* 重要フラグフィルター */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="sm" className="h-8">
							<SlidersHorizontal className="mr-2 h-4 w-4" />
							重要度
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuCheckboxItem
							checked={
								table.getColumn("is_important")?.getFilterValue() === true
							}
							onCheckedChange={() =>
								table.getColumn("is_important")?.setFilterValue(true)
							}
						>
							重要のみ
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

export function NewsTable({ data, onEdit, onDelete }: NewsTableProps) {
	// columnsにアクションを追加
	const columnsWithActions: ColumnDef<News>[] = [
		...columns,
		{
			id: "actions",
			header: "操作",
			cell: ({ row }) => {
				const news = row.original;
				return (
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={() => onEdit(news)}>
							編集
						</Button>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => onDelete(news.id)}
						>
							削除
						</Button>
					</div>
				);
			},
		},
	];
	return (
		<div className="space-y-4">
			<DataTable
				columns={columnsWithActions}
				data={data}
				toolbar={NewsTableToolbar}
				// ページネーションの設定
				pagination={{
					pageSize: 10,
					pageSizeOptions: [10, 20, 30, 50],
				}}
				// デフォルトのソート設定
				initialSorting={[
					{
						id: "published_at",
						desc: true,
					},
				]}
			/>
		</div>
	);
}

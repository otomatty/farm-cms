import { Card } from "@/components/ui/card";
import {
	useReactTable,
	type ColumnDef,
	getCoreRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ResponsiveDialog from "@/components/common/ResponsiveDialog";
import { TaskForm } from "@/components/webapp/forms/TaskForm";

export default function TaskList() {
	const tasks = [
		{ id: 1, title: "タスク1", completed: false },
		{ id: 2, title: "タスク2", completed: true },
		{ id: 3, title: "タスク3", completed: false },
		{ id: 4, title: "タスク4", completed: true },
		{ id: 5, title: "タスク5", completed: false },
		{ id: 6, title: "タスク6", completed: true },
	];

	const columns: ColumnDef<(typeof tasks)[0]>[] = [
		{
			accessorKey: "title",
			header: "タイトル",
		},
		{
			accessorKey: "completed",
			header: "完了",
			cell: ({ row }) => (row.original.completed ? "完了" : "未完了"),
		},
	];

	const table = useReactTable({
		data: tasks,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card className="p-4">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">タスク</h2>
				<div className="flex space-x-2">
					<Button variant="link">タスク一覧へ</Button>
					<ResponsiveDialog
						title="新規タスクを追加"
						description="新しいタスクを追加してください。"
						trigger={
							<Button variant="default" size="sm">
								タスクを追加する
							</Button>
						}
					>
						<TaskForm
							initialData={{
								title: "",
								dueDate: undefined,
								status: "未着手",
							}}
							onSubmit={() => {}}
						/>
					</ResponsiveDialog>
				</div>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: typeof header.column.columnDef.header === "function"
											? header.column.columnDef.header(header.getContext())
											: header.column.columnDef.header}
								</TableHead>
							))}
							<TableHead>操作</TableHead>
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{cell.getValue() as React.ReactNode}
								</TableCell>
							))}
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<MoreHorizontal className="cursor-pointer" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>編集</DropdownMenuItem>
										<DropdownMenuItem>削除</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

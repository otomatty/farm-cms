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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
export default function RecentInquiries() {
	const inquiries = [
		{ id: 1, subject: "お問い合わせ1", date: "2023-10-01" },
		{ id: 2, subject: "お問い合わせ2", date: "2023-10-02" },
		// 他のお問い合わせ
	];

	const columns: ColumnDef<(typeof inquiries)[0]>[] = [
		{
			accessorKey: "subject",
			header: "件名",
		},
		{
			accessorKey: "date",
			header: "日付",
		},
	];

	const table = useReactTable({
		data: inquiries,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card className="p-4 h-full">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">お問い合わせ</h2>
				<Button variant="link">お問い合わせ一覧へ</Button>
			</div>
			<ScrollArea className="h-[280px]">
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>
		</Card>
	);
}

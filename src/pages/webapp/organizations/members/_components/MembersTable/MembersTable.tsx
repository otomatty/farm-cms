"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
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
import { Input } from "@/components/ui/input";
import type { OrganizationMemberRow } from "@/types/organization";
import { useMemberTableOperations } from "./_hooks/useMemberTableOperations";
import { useMemberTableFilters } from "./_hooks/useMemberTableFilters";

interface MembersTableProps {
	columns: ColumnDef<OrganizationMemberRow>[];
	data: OrganizationMemberRow[];
	canManageMembers: boolean;
}

export const MembersTable = ({ columns, data }: MembersTableProps) => {
	const { sorting, setSorting, goToNextPage, goToPreviousPage } =
		useMemberTableOperations();

	const { filters, setFilters } = useMemberTableFilters();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters: filters,
		},
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<Input
					placeholder="名前で検索..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Input
					placeholder="メールアドレスで検索..."
					value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("email")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									メンバーが登録されていません
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={goToPreviousPage}
					disabled={!table.getCanPreviousPage()}
				>
					前へ
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={goToNextPage}
					disabled={!table.getCanNextPage()}
				>
					次へ
				</Button>
			</div>
		</div>
	);
};

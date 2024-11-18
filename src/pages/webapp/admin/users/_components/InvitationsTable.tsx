"use client";

import { useState } from "react";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	type SortingState,
	type ColumnFiltersState,
} from "@tanstack/react-table";
import { MoreHorizontal, Send, X, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type {
	InvitationWithDetails,
	InvitationStatus,
} from "@/types/organization";

interface InvitationsTableProps {
	data: InvitationWithDetails[];
	isLoading: boolean;
	onResendInvitation: (invitationId: string) => void;
	onCancelInvitation: (invitationId: string) => void;
}

export function InvitationsTable({
	data,
	isLoading,
	onResendInvitation,
	onCancelInvitation,
}: InvitationsTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const columns: ColumnDef<InvitationWithDetails>[] = [
		{
			accessorKey: "email",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						メールアドレス
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "role",
			header: "権限",
			cell: ({ row }) => {
				const role = row.getValue("role") as string;
				return role === "admin" ? "管理者" : "メンバー";
			},
		},
		{
			accessorKey: "status",
			header: "状態",
			cell: ({ row }) => {
				const status = row.getValue("status") as InvitationStatus;
				const statusMap: Record<
					InvitationStatus,
					{
						label: string;
						variant: "default" | "destructive" | "outline" | "secondary";
					}
				> = {
					pending: { label: "保留中", variant: "default" },
					accepted: { label: "承認済み", variant: "outline" },
					expired: { label: "期限切れ", variant: "secondary" },
					canceled: { label: "取り消し済み", variant: "destructive" },
				};

				const { label, variant } = statusMap[status];
				return <Badge variant={variant}>{label}</Badge>;
			},
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						招待日時
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				return format(
					new Date(row.getValue("createdAt")),
					"yyyy年MM月dd日 HH:mm",
					{
						locale: ja,
					},
				);
			},
		},
		{
			accessorKey: "expiresAt",
			header: "有効期限",
			cell: ({ row }) => {
				return format(
					new Date(row.getValue("expiresAt")),
					"yyyy年MM月dd日 HH:mm",
					{
						locale: ja,
					},
				);
			},
		},
		{
			accessorKey: "createdBy",
			header: "作成者",
			cell: ({ row }) => {
				const createdBy = row.getValue(
					"createdBy",
				) as InvitationWithDetails["createdBy"];
				return createdBy.name;
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const invitation = row.original;

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
							{invitation.status === "pending" && (
								<>
									<DropdownMenuItem
										onClick={() => onResendInvitation(invitation.id)}
									>
										<Send className="mr-2 h-4 w-4" />
										招待を再送信
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</>
							)}
							<DropdownMenuItem
								onClick={() => onCancelInvitation(invitation.id)}
								className="text-red-600"
							>
								<X className="mr-2 h-4 w-4" />
								招待を取り消し
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting,
			columnFilters,
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
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
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
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
									データがありません
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					前へ
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					次へ
				</Button>
			</div>
		</div>
	);
}

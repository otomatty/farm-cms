import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUsers } from "../_hooks/useUsers";
import type { OrganizationMember } from "@/types/organization";

interface DataTableRowActionsProps {
	row: Row<OrganizationMember>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
	const { updateRole } = useUsers();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">メニューを開く</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					onClick={() =>
						updateRole.mutate({ userId: row.original.id, role: "admin" })
					}
					disabled={row.original.role === "owner"}
				>
					管理者に設定
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						updateRole.mutate({ userId: row.original.id, role: "member" })
					}
					disabled={row.original.role === "owner"}
				>
					メンバーに設定
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-destructive"
					disabled={row.original.role === "owner"}
				>
					削除
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

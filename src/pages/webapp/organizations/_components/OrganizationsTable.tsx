import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Building2 } from "lucide-react";
import type {
	UserOrganizationWithDetails,
	OrganizationRole,
} from "@/types/organization";
import { formatDateShort } from "@/utils/formatDate";

interface OrganizationsTableProps {
	organizations: UserOrganizationWithDetails[];
}

const getRoleBadgeVariant = (role: OrganizationRole) => {
	switch (role) {
		case "owner":
			return "bg-primary/10 text-primary";
		case "admin":
			return "bg-blue-500/10 text-blue-500";
		case "member":
			return "bg-green-500/10 text-green-500";
	}
};

const getRoleLabel = (role: OrganizationRole) => {
	switch (role) {
		case "owner":
			return "オーナー";
		case "admin":
			return "管理者";
		case "member":
			return "メンバー";
	}
};

export const OrganizationsTable = ({
	organizations,
}: OrganizationsTableProps) => {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>組織名</TableHead>
						<TableHead>登録番号</TableHead>
						<TableHead>役割</TableHead>
						<TableHead>メールアドレス</TableHead>
						<TableHead>電話番号</TableHead>
						<TableHead>登録日</TableHead>
						<TableHead className="w-[50px]" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{organizations.map((org) => (
						<TableRow key={org.id}>
							<TableCell className="font-medium">
								<div className="flex items-center gap-2">
									<div className="flex size-8 items-center justify-center rounded-md border bg-muted">
										<Building2 className="size-4 text-muted-foreground" />
									</div>
									{org.name}
								</div>
							</TableCell>
							<TableCell>{org.rg_number}</TableCell>
							<TableCell>
								<span
									className={`rounded-md px-2 py-1 text-xs font-medium ${getRoleBadgeVariant(org.role as OrganizationRole)}`}
								>
									{getRoleLabel(org.role as OrganizationRole)}
								</span>
							</TableCell>
							<TableCell>{org.email}</TableCell>
							<TableCell>{org.phone_number}</TableCell>
							<TableCell>{formatDateShort(org.created_at)}</TableCell>
							<TableCell>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="size-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>詳細を表示</DropdownMenuItem>
										{org.role === "owner" && (
											<DropdownMenuItem>設定を編集</DropdownMenuItem>
										)}
										<DropdownMenuItem className="text-destructive">
											組織から退出
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

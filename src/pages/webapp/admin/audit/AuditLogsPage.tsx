import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";
import { useAuditLogs } from "./_hooks/useAuditLogs";
import { AuditLogFilters } from "./_components/AuditLogFilters";

export const AuditLogsPage = () => {
	const { logs, isLoading, filters, setFilters } = useAuditLogs();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">監査ログ</h1>
				<p className="text-sm text-muted-foreground">
					システムの操作履歴を確認できます
				</p>
			</div>

			<Card>
				<AuditLogFilters filters={filters} setFilters={setFilters} />
				<DataTable columns={columns} data={logs} isLoading={isLoading} />
			</Card>
		</div>
	);
};

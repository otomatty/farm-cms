import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";
import { useAuditLogs } from "./_hooks/useAuditLogs";
import { AuditLogFilters } from "./_components/AuditLogFilters";

export const AuditLogsPage = () => {
	const { logs, isLoading, filters, setFilters } = useAuditLogs();

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="監査ログ"
				description="システムの操作履歴を確認できます"
			/>

			<Card>
				<AuditLogFilters filters={filters} setFilters={setFilters} />
				<DataTable columns={columns} data={logs} isLoading={isLoading} />
			</Card>
		</div>
	);
};

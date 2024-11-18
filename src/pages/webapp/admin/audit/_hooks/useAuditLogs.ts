import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface AuditLog {
	id: string;
	action: string;
	actor: string;
	target: string;
	details: Record<string, any>;
	timestamp: string;
}

interface AuditLogFilters {
	action?: string;
	actor?: string;
	dateFrom?: Date;
	dateTo?: Date;
}

export const useAuditLogs = () => {
	const [filters, setFilters] = useState<AuditLogFilters>({});

	const { data: logs = [], isLoading } = useQuery({
		queryKey: ["audit-logs", filters],
		queryFn: async () => {
			let query = supabase
				.from("audit_logs")
				.select("*")
				.order("timestamp", { ascending: false });

			if (filters.action) {
				query = query.eq("action", filters.action);
			}
			if (filters.actor) {
				query = query.eq("actor", filters.actor);
			}
			if (filters.dateFrom) {
				query = query.gte("timestamp", filters.dateFrom.toISOString());
			}
			if (filters.dateTo) {
				query = query.lte("timestamp", filters.dateTo.toISOString());
			}

			const { data, error } = await query;
			if (error) throw error;
			return data as AuditLog[];
		},
	});

	return {
		logs,
		isLoading,
		filters,
		setFilters,
	};
};

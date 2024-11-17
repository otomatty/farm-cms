import { useState } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";

export const useMemberTableFilters = () => {
	const [filters, setFilters] = useState<ColumnFiltersState>([]);

	return {
		filters,
		setFilters,
		// フィルターヘルパー
		setNameFilter: (name: string) => {
			setFilters((prev) => [
				...prev.filter((f) => f.id !== "name"),
				{ id: "name", value: name },
			]);
		},
		setEmailFilter: (email: string) => {
			setFilters((prev) => [
				...prev.filter((f) => f.id !== "email"),
				{ id: "email", value: email },
			]);
		},
		clearFilters: () => setFilters([]),
	};
};

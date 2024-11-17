import { useState } from "react";
import type { SortingState, PaginationState } from "@tanstack/react-table";

export const useMemberTableOperations = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	return {
		sorting,
		setSorting,
		pagination,
		setPagination,
		// ページネーションヘルパー
		currentPage: pagination.pageIndex + 1,
		totalPages: 0, // TODO: 計算ロジック
		goToNextPage: () =>
			setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 })),
		goToPreviousPage: () =>
			setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 })),
	};
};

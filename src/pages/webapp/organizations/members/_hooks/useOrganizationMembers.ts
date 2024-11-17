import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { organizationService } from "@/services/organizationService";
import type { OrganizationMember } from "@/types/organization";

interface OrganizationError {
	message: string;
	code?: string;
}

export const useOrganizationMembers = () => {
	const { organizationId } = useParams<{ organizationId: string }>();
	const [members, setMembers] = useState<OrganizationMember[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<OrganizationError | null>(null);

	const fetchMembers = useCallback(async () => {
		if (!organizationId) {
			setError({
				message: "組織IDが指定されていません",
				code: "INVALID_PARAMS",
			});
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const data =
				await organizationService.getOrganizationMembers(organizationId);
			setMembers(data);
		} catch (err) {
			if (err instanceof Error) {
				setError({ message: err.message, code: "UNKNOWN" });
			} else {
				setError({ message: "予期せぬエラーが発生しました", code: "UNKNOWN" });
			}
		} finally {
			setIsLoading(false);
		}
	}, [organizationId]);

	// 初回レンダリング時にメンバー一覧を取得
	useEffect(() => {
		fetchMembers();
	}, [fetchMembers]);

	return {
		members,
		isLoading,
		error,
		refetch: fetchMembers,
	};
};

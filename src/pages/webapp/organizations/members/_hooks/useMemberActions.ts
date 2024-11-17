import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { organizationService } from "@/services/organizationService";
import type { OrganizationRole } from "@/types/organization";

interface MemberActionError {
	message: string;
	code?: string;
}

export const useMemberActions = (onSuccess?: () => void) => {
	const { organizationId } = useParams<{ organizationId: string }>();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<MemberActionError | null>(null);

	// メンバーの役割を更新
	const updateRole = useCallback(
		async (memberId: string, newRole: OrganizationRole) => {
			if (!organizationId) return;

			try {
				setIsLoading(true);
				setError(null);

				await organizationService.updateMemberRole(
					organizationId,
					memberId,
					newRole,
				);

				toast({
					title: "役割を更新しました",
					description: "メンバーの役割が正常に更新されました。",
				});

				onSuccess?.();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "役割の更新に失敗しました";
				setError({ message });

				toast({
					variant: "destructive",
					title: "エラー",
					description: message,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[organizationId, toast, onSuccess],
	);

	// メンバーを削除
	const removeMember = useCallback(
		async (memberId: string) => {
			if (!organizationId) return;

			try {
				setIsLoading(true);
				setError(null);

				await organizationService.removeMember(organizationId, memberId);

				toast({
					title: "メンバーを削除しました",
					description: "メンバーが正常に削除されました。",
				});

				onSuccess?.();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "メンバーの削除に失敗しました";
				setError({ message });

				toast({
					variant: "destructive",
					title: "エラー",
					description: message,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[organizationId, toast, onSuccess],
	);

	return {
		updateRole,
		removeMember,
		isLoading,
		error,
	};
};

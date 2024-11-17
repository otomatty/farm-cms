import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { organizationService } from "@/services/organizationService";
import type { OrganizationRole } from "@/types/organization";

interface InviteError {
	message: string;
	code?: string;
}

export const useInviteMember = (onSuccess?: () => void) => {
	const { organizationId } = useParams<{ organizationId: string }>();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<InviteError | null>(null);

	const inviteMember = useCallback(
		async (email: string, role: OrganizationRole) => {
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

				await organizationService.inviteMember(organizationId, {
					email,
					role,
				});

				toast({
					title: "招待を送信しました",
					description: `${email} 宛に招待メールを送信しました。`,
				});

				onSuccess?.();
			} catch (err) {
				const message =
					err instanceof Error ? err.message : "招待の送信に失敗しました";
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
		inviteMember,
		isLoading,
		error,
	};
};

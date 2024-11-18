import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type {
	OrganizationRole,
	InvitationWithDetails,
} from "@/types/organization";

export interface CreateInvitationParams {
	email: string;
	role: OrganizationRole;
	message?: string;
}

export const useInvitations = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	// 招待一覧の取得
	const { data: invitations = [], isLoading } = useQuery({
		queryKey: ["organization-invitations"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("organization_invitations")
				.select(`
					*,
					created_by_profile:created_by(
						full_name,
						email
					)
				`)
				.order("created_at", { ascending: false });

			if (error) throw error;

			return data.map(
				(item): InvitationWithDetails => ({
					id: item.id,
					email: item.email,
					role: item.role,
					status: item.status,
					message: item.message,
					expiresAt: item.expires_at,
					createdAt: item.created_at,
					createdBy: {
						name: item.created_by_profile.full_name ?? "未設定",
						email: item.created_by_profile.email,
					},
				}),
			);
		},
	});

	// 新規招待の作成
	const createInvitation = useMutation<void, Error, CreateInvitationParams>({
		mutationFn: async ({ email, role, message }) => {
			const { error } = await supabase.from("organization_invitations").insert({
				email,
				role,
				message,
				status: "pending",
				expires_at: new Date(
					Date.now() + 7 * 24 * 60 * 60 * 1000,
				).toISOString(),
			});

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-invitations"] });
			toast({
				title: "招待を送信しました",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "招待の送信に失敗しました",
			});
		},
	});

	// 招待の再送信
	const resendInvitation = useMutation({
		mutationFn: async (invitationId: string) => {
			const { error } = await supabase
				.from("organization_invitations")
				.update({
					expires_at: new Date(
						Date.now() + 7 * 24 * 60 * 60 * 1000,
					).toISOString(),
					status: "pending",
				})
				.eq("id", invitationId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-invitations"] });
			toast({
				title: "招待を再送信しました",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "招待の再送信に失敗しました",
			});
		},
	});

	// 招待の取り消し
	const cancelInvitation = useMutation({
		mutationFn: async (invitationId: string) => {
			const { error } = await supabase
				.from("organization_invitations")
				.update({ status: "canceled" })
				.eq("id", invitationId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-invitations"] });
			toast({
				title: "招待を取り消しました",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "招待の取り消しに失敗しました",
			});
		},
	});

	return {
		invitations,
		isLoading,
		createInvitation,
		resendInvitation,
		cancelInvitation,
	};
};

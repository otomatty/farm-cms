import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { OrganizationRole } from "@/types/organization";

interface Invitation {
	id: string;
	email: string;
	role: OrganizationRole;
	status: "pending" | "accepted" | "expired";
	expiresAt: string;
	createdAt: string;
}

export const useInvitations = () => {
	const queryClient = useQueryClient();

	const { data: invitations = [], isLoading } = useQuery({
		queryKey: ["invitations"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("invitations")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			return data as Invitation[];
		},
	});

	const createInvitation = useMutation({
		mutationFn: async ({
			email,
			role,
		}: {
			email: string;
			role: OrganizationRole;
		}) => {
			const { error } = await supabase.from("invitations").insert({
				email,
				role,
				status: "pending",
				expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日後
			});

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invitations"] });
			toast.success("招待を送信しました");
		},
		onError: () => {
			toast.error("招待の送信に失敗しました");
		},
	});

	return {
		invitations,
		isLoading,
		createInvitation,
	};
};

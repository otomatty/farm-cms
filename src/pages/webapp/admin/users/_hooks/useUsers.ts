import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { OrganizationMember } from "@/types/organization";
import { useToast } from "@/hooks/use-toast";
import type { OrganizationRole } from "@/types/organization";
import { useAtomValue } from "jotai";
import { currentOrganizationAtom } from "@/stores/organizationAtom";

// Supabaseのレスポンス型を定義
interface UserOrganizationResponse {
	user_id: string;
	role: string;
	created_at: string;
	user_profiles: {
		user_id: string;
		full_name: string | null;
		email: string;
		profile_image: string | null;
	};
}

export const useUsers = () => {
	const queryClient = useQueryClient();
	const currentOrganization = useAtomValue(currentOrganizationAtom);
	const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>(
		{},
	);
	const { toast } = useToast();

	// ユーザー一覧の取得
	const { data: users = [], isLoading } = useQuery({
		queryKey: ["organization-members", currentOrganization?.id],
		queryFn: async () => {
			if (!currentOrganization?.id) throw new Error("組織が選択されていません");

			const { data, error } = await supabase
				.from("user_organizations")
				.select(`
          *,
          user_profiles:user_id(
            user_id,
            full_name,
            email,
            profile_image
          )
        `)
				.eq("organization_id", currentOrganization.id);

			if (error) throw error;

			return (data as UserOrganizationResponse[]).map(
				(item): OrganizationMember => ({
					id: item.user_profiles.user_id,
					name: item.user_profiles.full_name ?? "未設定",
					email: item.user_profiles.email,
					role: item.role as OrganizationRole,
					profileImage: item.user_profiles.profile_image ?? undefined,
					joinedAt: item.created_at,
				}),
			);
		},
		enabled: !!currentOrganization?.id,
	});

	// ユーザーロールの更新
	const updateRole = useMutation({
		mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
			const { error } = await supabase
				.from("user_organizations")
				.update({ role })
				.eq("user_id", userId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-members"] });
			toast({
				title: "ユーザーロールを更新しました",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "ユーザーロールの更新に失敗しました",
			});
		},
	});

	// ユーザーの削除
	const removeUsers = useMutation({
		mutationFn: async (userIds: string[]) => {
			const { error } = await supabase
				.from("user_organizations")
				.delete()
				.in("user_id", userIds);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-members"] });
			setSelectedUsers({});
			toast({
				title: "選択したユーザーを削除しました",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "ユーザーの削除に失敗しました",
			});
		},
	});

	return {
		users,
		isLoading,
		selectedUsers,
		setSelectedUsers,
		updateRole,
		removeUsers,
	};
};

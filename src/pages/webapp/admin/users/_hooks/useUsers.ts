import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { OrganizationMember } from "@/types/organization";
import { useToast } from "@/hooks/use-toast";

export const useUsers = () => {
	const queryClient = useQueryClient();
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const { toast } = useToast();

	// ユーザー一覧の取得
	const { data: users = [], isLoading } = useQuery({
		queryKey: ["organization-members"],
		queryFn: async () => {
			const { data, error } = await supabase.from("user_organizations").select(`
          *,
          user_profiles:user_id(
            user_id,
            full_name,
            email,
            profile_image
          )
        `);

			if (error) throw error;

			return data.map(
				(item: any): OrganizationMember => ({
					id: item.user_profiles.user_id,
					name: item.user_profiles.full_name,
					email: item.user_profiles.email,
					role: item.role,
					profileImage: item.user_profiles.profile_image,
					joinedAt: item.created_at,
				}),
			);
		},
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
			setSelectedUsers([]);
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { OrganizationRole } from "@/types/organization";

interface ContentPermission {
	id: string;
	contentType: string;
	role: OrganizationRole;
	description: string;
}

export const useContentPermissions = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { data: permissions = [], isLoading } = useQuery({
		queryKey: ["content-permissions"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("content_permissions")
				.select(`
          id,
          content_types (name),
          role,
          description
        `)
				.order("content_types(name)");

			if (error) throw error;

			return data.map(
				(item: any): ContentPermission => ({
					id: item.id,
					contentType: item.content_types.name,
					role: item.role,
					description: item.description,
				}),
			);
		},
	});

	const updatePermission = useMutation({
		mutationFn: async ({
			permissionId,
			role,
		}: {
			permissionId: string;
			role: OrganizationRole;
		}) => {
			const { error } = await supabase
				.from("content_permissions")
				.update({ role })
				.eq("id", permissionId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["content-permissions"] });
			toast({
				title: "権限を更新しました",
			});
		},
		onError: () => {
			toast({
				title: "権限の更新に失敗しました",
				variant: "destructive",
			});
		},
	});

	return {
		permissions,
		isLoading,
		updatePermission,
	};
};

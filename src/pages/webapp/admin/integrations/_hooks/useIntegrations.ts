import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Integration {
	id: string;
	name: string;
	description: string;
	icon: string;
	enabled: boolean;
	configUrl?: string;
}

export const useIntegrations = () => {
	const queryClient = useQueryClient();

	const { data: integrations = [], isLoading } = useQuery({
		queryKey: ["integrations"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("integrations")
				.select("*")
				.order("name");

			if (error) throw error;
			return data as Integration[];
		},
	});

	const toggleIntegration = useMutation({
		mutationFn: async ({
			integrationId,
			enabled,
		}: {
			integrationId: string;
			enabled: boolean;
		}) => {
			const { error } = await supabase
				.from("integrations")
				.update({ enabled })
				.eq("id", integrationId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["integrations"] });
			toast.success("設定を更新しました");
		},
		onError: () => {
			toast.error("設定の更新に失敗しました");
		},
	});

	return {
		integrations,
		isLoading,
		toggleIntegration,
	};
};

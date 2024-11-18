import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ContentType {
	id: string;
	name: string;
	description: string;
	enabled: boolean;
}

export const useContentSettings = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { data: settings = [], isLoading } = useQuery({
		queryKey: ["content-settings"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("content_types")
				.select("*")
				.order("name");

			if (error) throw error;
			return data as ContentType[];
		},
	});

	const updateSettings = useMutation({
		mutationFn: async ({
			contentTypeId,
			enabled,
		}: {
			contentTypeId: string;
			enabled: boolean;
		}) => {
			const { error } = await supabase
				.from("content_types")
				.update({ enabled })
				.eq("id", contentTypeId);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["content-settings"] });
			toast({
				title: "設定を更新しました",
			});
		},
		onError: () => {
			toast({
				title: "設定の更新に失敗しました",
				variant: "destructive",
			});
		},
	});

	return {
		settings,
		isLoading,
		updateSettings,
	};
};

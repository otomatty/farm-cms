import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentTypeService } from "@/services/contentTypeService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { ContentType } from "@/types/content";

export const useContentSettings = (organizationId: string) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { user } = useAuth();

	// 組織のコンテンツ設定を取得
	const getContentSettings = useCallback(async (): Promise<ContentType[]> => {
		if (!user || !organizationId) {
			return [];
		}

		try {
			const settings =
				await contentTypeService.getAllForOrganization(organizationId);
			return settings;
		} catch (error) {
			console.error("Failed to fetch content settings:", error);
			return [];
		}
	}, [user, organizationId]);

	// React Queryを使用したデータフェッチング
	const { data: settings = [], isLoading } = useQuery<ContentType[]>({
		queryKey: ["content-settings", organizationId],
		queryFn: getContentSettings,
		enabled: !!user && !!organizationId,
	});

	// 設定の更新
	const updateContentSetting = useCallback(
		async (contentTypeId: string, enabled: boolean): Promise<void> => {
			if (!user || !organizationId) {
				throw new Error(
					"ユーザーが認証されていないか、組織が選択されていません",
				);
			}

			try {
				await contentTypeService.updateOrganizationSetting(
					organizationId,
					contentTypeId,
					enabled,
				);
			} catch (error) {
				console.error("Failed to update content setting:", error);
				throw error;
			}
		},
		[user, organizationId],
	);

	// React Query Mutationの設定
	const updateSettings = useMutation({
		mutationFn: async (params: { contentTypeId: string; enabled: boolean }) => {
			await updateContentSetting(params.contentTypeId, params.enabled);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["content-settings", organizationId],
			});
			toast({
				title: "設定を更新しました",
				description: "コンテンツタイプの設定が正常に更新されました",
			});
		},
		onError: (error) => {
			console.error("Settings update error:", error);
			toast({
				title: "設定の更新に失敗しました",
				description: "もう一度お試しください",
				variant: "destructive",
			});
		},
	});

	// 初期設定の作成
	const initializeSettings = useCallback(async (): Promise<void> => {
		if (!user || !organizationId) {
			throw new Error("ユーザーが認証されていないか、組織が選択されていません");
		}

		try {
			await contentTypeService.initializeOrganizationSettings(organizationId);
		} catch (error) {
			console.error("Failed to initialize content settings:", error);
			throw error;
		}
	}, [user, organizationId]);

	return {
		settings,
		isLoading,
		updateSettings: (contentTypeId: string, enabled: boolean) =>
			updateSettings.mutate({ contentTypeId, enabled }),
		initializeSettings,
	};
};

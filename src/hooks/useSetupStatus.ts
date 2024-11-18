import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface SetupStatus {
	isProfileCompleted: boolean;
	isOrganizationCompleted: boolean;
	isSetupCompleted: boolean;
}

export const useSetupStatus = (options?: {
	enableLogging?: boolean;
}) => {
	const { session } = useAuth();

	return useQuery({
		queryKey: ["setupStatus", session?.user?.id],
		queryFn: async (): Promise<SetupStatus> => {
			if (!session?.user?.id) {
				throw new Error("User not authenticated");
			}

			try {
				const [profileResult, organizationsResult] = await Promise.all([
					supabase
						.from("user_profiles")
						.select("setup_completed")
						.eq("user_id", session.user.id)
						.single(),
					supabase
						.from("user_organizations")
						.select(`
							organization_id,
							organizations (id, name)
						`)
						.eq("user_id", session.user.id),
				]);

				const hasProfile = !!profileResult.data?.setup_completed;
				const hasOrganization = (organizationsResult.data?.length ?? 0) > 0;

				if (options?.enableLogging) {
					console.log("Profile check result:", profileResult.data);
					console.log("Organization check result:", {
						hasOrganization,
						organizations: organizationsResult.data,
					});
				}

				const status: SetupStatus = {
					isProfileCompleted: hasProfile,
					isOrganizationCompleted: hasOrganization,
					isSetupCompleted: hasProfile && hasOrganization,
				};

				return status;
			} catch (error) {
				console.error("Setup status check failed:", error);
				throw error;
			}
		},
		staleTime: 1000 * 60 * 5, // 5分間キャッシュを有効に
		gcTime: 1000 * 60 * 30, // 30分間キャッシュを保持
		retry: 3, // リトライ回数を設定
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
		enabled: !!session?.user?.id,
	});
};

// 簡略化されたバージョンを提供するユーティリティフック
export const useSetupCompletion = () => {
	const { data, isLoading } = useSetupStatus();
	return {
		isSetupCompleted: data?.isSetupCompleted ?? false,
		isLoading,
	};
};

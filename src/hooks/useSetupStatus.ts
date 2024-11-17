import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const useSetupStatus = () => {
	const { session } = useAuth();
	const [isProfileCompleted, setIsProfileCompleted] = useState(false);
	const [isOrganizationCompleted, setIsOrganizationCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkSetupStatus = async () => {
			if (!session?.user?.id) return;

			try {
				// プロフィールと組織情報を並行して取得
				const [profileResult, organizationResult] = await Promise.all([
					supabase
						.from("user_profiles")
						.select("user_id")
						.eq("user_id", session.user.id)
						.single(),
					supabase
						.from("user_organizations")
						.select("id")
						.eq("user_id", session.user.id)
						.limit(1)
						.single(),
				]);

				// プロフィールの確認
				if (profileResult.error && profileResult.error.code !== "PGRST116") {
					console.error("Profile check error:", profileResult.error);
				}
				setIsProfileCompleted(!!profileResult.data);

				// 組織の確認
				if (
					organizationResult.error &&
					organizationResult.error.code !== "PGRST116"
				) {
					console.error("Organization check error:", organizationResult.error);
				}
				setIsOrganizationCompleted(!!organizationResult.data);
			} catch (error) {
				console.error("Setup status check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkSetupStatus();
	}, [session?.user?.id]);

	return {
		isProfileCompleted,
		isOrganizationCompleted,
		isLoading,
	};
};

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";

interface SetupStatus {
	isSetupCompleted: boolean;
	isLoading: boolean;
}

export const useSetupCheck = (): SetupStatus => {
	const [isSetupCompleted, setIsSetupCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { session } = useAuth();
	const { organizations } = useOrganizationSwitcher();

	useEffect(() => {
		const checkSetupStatus = async () => {
			if (!session?.user?.id) {
				setIsLoading(false);
				return;
			}

			try {
				console.log("Checking setup status for user:", session.user.id);

				// プロフィールの確認
				const { data: profile, error: profileError } = await supabase
					.from("user_profiles")
					.select("setup_completed")
					.eq("user_id", session.user.id)
					.single();

				if (profileError) throw profileError;

				console.log("Profile check result:", profile);

				// 組織所属の確認（useOrganizationSwitcherから取得）
				const hasOrganization = organizations.length > 0;
				console.log("Organization check result:", {
					hasOrganization,
					organizations,
				});

				const setupCompleted = !!profile?.setup_completed && hasOrganization;
				console.log("Final setup status:", setupCompleted);

				setIsSetupCompleted(setupCompleted);

				// セットアップ状態をローカルストレージに保存
				if (setupCompleted) {
					localStorage.setItem(`setup_completed_${session.user.id}`, "true");
				}
			} catch (error) {
				console.error("Setup check failed:", error);
				setIsSetupCompleted(false);
			} finally {
				setIsLoading(false);
			}
		};

		// ローカルストレージから状態を復元
		const restoreSetupStatus = () => {
			if (session?.user?.id) {
				const stored = localStorage.getItem(
					`setup_completed_${session.user.id}`,
				);
				if (stored === "true") {
					setIsSetupCompleted(true);
					setIsLoading(false);
					return true;
				}
			}
			return false;
		};

		// まずローカルストレージをチェック
		if (!restoreSetupStatus()) {
			checkSetupStatus();
		}
	}, [session?.user?.id, organizations]);

	return {
		isSetupCompleted,
		isLoading,
	};
};

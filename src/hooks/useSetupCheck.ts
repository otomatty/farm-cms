import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

interface SetupStatus {
	isSetupCompleted: boolean;
	isLoading: boolean;
}

export const useSetupCheck = (): SetupStatus => {
	const [isSetupCompleted, setIsSetupCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { session } = useAuth();

	useEffect(() => {
		const checkSetupStatus = async () => {
			if (!session?.user?.id) {
				setIsLoading(false);
				return;
			}

			try {
				const { data, error } = await supabase
					.from("user_profiles")
					.select("setup_completed, organization_id")
					.eq("user_id", session.user.id)
					.single();

				if (error) throw error;

				// プロフィールが存在し、かつ組織に所属している場合にセットアップ完了とみなす
				setIsSetupCompleted(!!data?.setup_completed && !!data?.organization_id);
			} catch (error) {
				console.error("Setup check failed:", error);
				setIsSetupCompleted(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkSetupStatus();
	}, [session?.user?.id]);

	return {
		isSetupCompleted,
		isLoading,
	};
};

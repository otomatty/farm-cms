// セットアップ完了状態のチェック
// user_profilesテーブルのsetup_completedカラムがtrueかどうかで判断する
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const useSetupCompletion = () => {
	const { session } = useAuth();
	const [isSetupCompleted, setIsSetupCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkSetupCompletion = async () => {
			if (!session?.user?.id) return;

			try {
				const { data, error } = await supabase
					.from("user_profiles")
					.select("setup_completed")
					.eq("user_id", session.user.id)
					.single();

				if (error) throw error;
				setIsSetupCompleted(!!data?.setup_completed);
			} catch (error) {
				console.error("Setup completion check failed:", error);
				setIsSetupCompleted(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkSetupCompletion();
	}, [session?.user?.id]);

	return {
		isSetupCompleted,
		isLoading,
	};
};

import { supabase } from "@/lib/supabase";

export const completeSetup = async (userId: string) => {
	// プロフィールの存在確認
	const { error: profileError } = await supabase
		.from("user_profiles")
		.select("user_id")
		.eq("user_id", userId)
		.single();

	if (profileError) {
		console.error("Profile check error:", profileError);
		throw new Error("プロフィールが見つかりません");
	}

	// セットアップ完了状態の更新
	const { data, error } = await supabase
		.from("user_profiles")
		.update({
			setup_completed: true,
			setup_completed_at: new Date().toISOString(),
		})
		.eq("user_id", userId)
		.select()
		.single();

	if (error) {
		console.error("Setup completion error:", error);
		throw new Error("セットアップの完了に失敗しました");
	}

	return data;
};

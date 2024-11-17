import type { Database } from "@/types/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

type OrganizationInvite =
	Database["public"]["Tables"]["organization_invites"]["Row"];

export async function validateInviteCode(
	supabase: SupabaseClient<Database>,
	code: string,
): Promise<{ valid: boolean; invite?: OrganizationInvite; error?: string }> {
	try {
		const { data: invite, error } = await supabase
			.from("organization_invites")
			.select("*")
			.eq("code", code)
			.eq("status", "active")
			.single();

		if (error) throw error;
		if (!invite) return { valid: false, error: "招待コードが見つかりません" };

		// 有効期限チェック
		if (new Date(invite.expires_at) < new Date()) {
			// 有効期限切れの場合はステータスを更新
			await supabase
				.from("organization_invites")
				.update({
					status: "expired",
					updated_at: new Date().toISOString(),
				})
				.eq("id", invite.id);

			return { valid: false, error: "招待コードの有効期限が切れています" };
		}

		// 使用回数チェック
		if (
			invite.used_count &&
			invite.max_uses &&
			invite.used_count >= invite.max_uses
		) {
			// 使用回数上限に達した場合はステータスを更新
			await supabase
				.from("organization_invites")
				.update({
					status: "used",
					updated_at: new Date().toISOString(),
				})
				.eq("id", invite.id);

			return {
				valid: false,
				error: "招待コードの使用回数が上限に達しています",
			};
		}

		return { valid: true, invite };
	} catch (error) {
		console.error("Error validating invite code:", error);
		return { valid: false, error: "招待コードの検証中にエラーが発生しました" };
	}
}

// 招待コードを使用する関数
export async function useInviteCode(
	supabase: SupabaseClient<Database>,
	inviteId: number,
): Promise<{ success: boolean; error?: string }> {
	try {
		// まず現在の使用回数を取得
		const { data: invite, error: fetchError } = await supabase
			.from("organization_invites")
			.select("used_count")
			.eq("id", inviteId)
			.single();

		if (fetchError) throw fetchError;
		if (!invite) throw new Error("招待コードが見つかりません");

		// 使用回数をインクリメント
		const { error: updateError } = await supabase
			.from("organization_invites")
			.update({
				used_count: (invite.used_count || 0) + 1,
				updated_at: new Date().toISOString(),
			})
			.eq("id", inviteId);

		if (updateError) throw updateError;
		return { success: true };
	} catch (error) {
		console.error("Error using invite code:", error);
		return {
			success: false,
			error: "招待コードの使用中にエラーが発生しました",
		};
	}
}

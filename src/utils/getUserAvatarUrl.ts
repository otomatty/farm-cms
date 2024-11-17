import type { User } from "@supabase/supabase-js";

/**
 * ユーザーのアバターURLを取得
 * @param user ユーザー
 * @returns アバターURL
 */
export const getUserAvatarUrl = (user?: User | null): string => {
	if (!user) return "";

	// 1. カスタムプロフィール画像（Supabaseにアップロードされた画像）を確認
	const customAvatar = user.user_metadata?.avatar_url;
	if (customAvatar?.includes("supabase")) {
		return customAvatar;
	}

	// 2. Googleのアバター画像を確認
	const googleAvatar =
		user.user_metadata?.avatar_url || // OAuth provider
		user.user_metadata?.picture || // Google specific
		user.user_metadata?.photoURL; // 代替フィールド

	if (googleAvatar) {
		return googleAvatar;
	}

	// 3. デフォルトのアバター画像を返す
	return "";
};

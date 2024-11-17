import { supabase } from "@/lib/supabase";
import type { UserProfileFormValues } from "@/schemas/userProfileSchema";
import type {
	DbUserProfile,
	DbUserProfileInsert,
	UserProfile,
} from "@/types/userProfile";

// データベースに保存するためのマッピング
const mapToDbProfile = (
	userId: string,
	profile: UserProfileFormValues,
): DbUserProfileInsert => ({
	user_id: userId,
	full_name: profile.full_name,
	email: profile.email,
	phone_number: profile.phone_number,
	profile_image: profile.profile_image,
	bio: profile.bio,
});

// データベースから取得したデータをUserProfileにマッピング
const mapFromDbProfile = (data: DbUserProfile): UserProfile => ({
	userId: data.user_id,
	fullName: data.full_name,
	email: data.email,
	phoneNumber: data.phone_number ?? undefined,
	profileImage: data.profile_image ?? undefined,
	bio: data.bio ?? undefined,
	createdAt: data.created_at ?? "",
	updatedAt: data.updated_at ?? "",
});

// ユーザープロフィールのCRUD操作
export const userProfileService = {
	// ユーザープロフィールの作成
	async createUserProfile(
		userId: string,
		profile: UserProfileFormValues,
	): Promise<UserProfile> {
		const { data, error } = await supabase
			.from("user_profiles")
			.insert([mapToDbProfile(userId, profile)])
			.select()
			.single();

		if (error) {
			throw new Error(
				`ユーザープロフィールの作成に失敗しました: ${error.message}`,
			);
		}

		return mapFromDbProfile(data);
	},

	// ユーザープロフィールの取得
	async getUserProfile(userId: string): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from("user_profiles")
			.select()
			.eq("user_id", userId)
			.single();

		if (error) {
			if (error.code === "PGRST116") return null;
			throw new Error(
				`ユーザープロフィールの取得に失敗しました: ${error.message}`,
			);
		}

		return data ? mapFromDbProfile(data) : null;
	},

	// ユーザープロフィールの存在確認
	async checkUserProfileExists(userId: string): Promise<boolean> {
		try {
			const { data, error } = await supabase
				.from("user_profiles")
				.select("user_id")
				.eq("user_id", userId)
				.single();

			if (error) {
				if (error.code === "PGRST116") return false; // データが見つからない場合
				throw error;
			}

			return !!data;
		} catch (error) {
			console.error("Error checking user profile:", error);
			return false;
		}
	},
};

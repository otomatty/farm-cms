import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./useAuth";
import { supabase } from "@/lib/supabase";
import {
	userProfileSchema,
	type UserProfileFormValues,
} from "@/schemas/userProfileSchema";

interface UseUserProfileOptions {
	defaultValues?: Partial<UserProfileFormValues>;
}

export function useUserProfile(options?: UseUserProfileOptions) {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<UserProfileFormValues | null>(
		null,
	);

	const form = useForm<UserProfileFormValues>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: options?.defaultValues ?? {
			email: "",
			full_name: "",
			profile_image: "",
			phone_number: "",
			bio: "",
		},
	});

	// プロフィール情報の取得
	const getUserProfile = useCallback(async () => {
		if (!user) {
			setError("ユーザーが認証されていません");
			return null;
		}

		try {
			const { data, error: fetchError } = await supabase
				.from("user_profiles")
				.select("*")
				.eq("user_id", user.id)
				.single();

			if (fetchError) throw fetchError;
			return data;
		} catch (err) {
			console.error("Profile fetch error:", err);
			setError(
				err instanceof Error ? err.message : "プロフィールの取得に失敗しました",
			);
			return null;
		}
	}, [user]);

	// 初期データの取得
	useEffect(() => {
		const loadProfile = async () => {
			const profile = await getUserProfile();
			if (profile) {
				setProfileData(profile);
				form.reset(profile);
			}
			setIsLoading(false);
		};

		loadProfile();
	}, [getUserProfile, form]);

	// プロフィールの作成または更新
	const updateProfile = useCallback(
		async (values: UserProfileFormValues) => {
			if (!user) {
				setError("ユーザーが認証されていません");
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const { data: existingProfile } = await supabase
					.from("user_profiles")
					.select()
					.eq("user_id", user.id)
					.single();

				if (existingProfile) {
					// 更新
					const { error: updateError } = await supabase
						.from("user_profiles")
						.update(values)
						.eq("user_id", user.id);

					if (updateError) throw updateError;
				} else {
					// 新規作成
					const { error: insertError } = await supabase
						.from("user_profiles")
						.insert([
							{
								user_id: user.id,
								...values,
							},
						]);

					if (insertError) throw insertError;
				}

				// 更新後のデータを取得
				const updatedProfile = await getUserProfile();
				if (updatedProfile) {
					setProfileData(updatedProfile);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "プロフィールの作成/更新に失敗しました",
				);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[user, getUserProfile],
	);

	// プロフィールの新規作成
	const createProfile = useCallback(
		async (values: UserProfileFormValues) => {
			if (!user) {
				setError("ユーザーが認証されていません");
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				// 新規作成
				const { error: insertError } = await supabase
					.from("user_profiles")
					.insert([
						{
							user_id: user.id,
							...values,
						},
					]);

				if (insertError) throw insertError;

				// 作成後のデータを取得
				const newProfile = await getUserProfile();
				if (newProfile) {
					setProfileData(newProfile);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "プロフィールの作成に失敗しました",
				);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[user, getUserProfile],
	);

	return {
		form,
		profileData,
		updateProfile,
		createProfile,
		getUserProfile,
		isLoading,
		error,
	};
}

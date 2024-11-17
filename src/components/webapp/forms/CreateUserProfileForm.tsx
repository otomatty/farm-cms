import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import type { UserProfileFormValues } from "@/schemas/userProfileSchema";

interface CreateUserProfileFormProps {
	onSuccess?: () => void;
	initialData?: {
		email?: string;
		full_name?: string;
		profile_image?: string;
		phone_number?: string;
		bio?: string;
	};
}

export function CreateUserProfileForm({
	onSuccess,
	initialData,
}: CreateUserProfileFormProps) {
	const { form, createProfile, isLoading, error } = useUserProfile({
		defaultValues: {
			email: initialData?.email ?? "",
			full_name: initialData?.full_name ?? "",
			profile_image: initialData?.profile_image ?? "",
			phone_number: initialData?.phone_number ?? "",
			bio: initialData?.bio ?? "",
		},
	});

	// Google アバター画像をリセットする関数
	const resetToGoogleAvatar = () => {
		form.setValue("profile_image", initialData?.profile_image ?? "");
	};

	const onSubmit = async (values: UserProfileFormValues) => {
		try {
			await createProfile(values);
			onSuccess?.();
		} catch (err) {
			// エラー処理はuseUserProfile内で行われます
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{error && <div className="text-red-500">{error}</div>}

				<FormField
					control={form.control}
					name="profile_image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>プロフィール画像</FormLabel>
							<FormControl>
								<ImageUpload
									value={field.value}
									onChange={field.onChange}
									bucket="avatars"
									onReset={resetToGoogleAvatar}
									initialImage={initialData?.profile_image}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="full_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>氏名</FormLabel>
							<FormControl>
								<Input {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<FormControl>
								<Input {...field} type="email" required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>電話番号（任意）</FormLabel>
							<FormControl>
								<Input {...field} type="tel" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>自己紹介（任意）</FormLabel>
							<FormControl>
								<Textarea {...field} rows={4} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading
						? "送信中..."
						: initialData?.email
							? "更新する"
							: "次へ進む"}
				</Button>
			</form>
		</Form>
	);
}

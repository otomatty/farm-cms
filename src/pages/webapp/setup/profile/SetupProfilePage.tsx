import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateUserProfileForm } from "@/components/webapp/forms/CreateUserProfileForm";
import { useNavigate } from "react-router-dom";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarUrl } from "@/utils/getUserAvatarUrl";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useSetupStore } from "@/stores/setupStore";
import type { UserProfileFormValues } from "@/schemas/userProfileSchema";
import { useToast } from "@/hooks/use-toast";

export const SetupProfilePage = () => {
	const navigate = useNavigate();
	const { session } = useAuth();
	const { toast } = useToast();
	const { profileData, isLoading, error, updateProfile } = useUserProfile();
	const { setProfileCompleted } = useSetupStore();

	const handleSuccess = () => {
		setProfileCompleted(true);
		navigate("/webapp/setup");
	};

	const handleSubmit = async (data: UserProfileFormValues) => {
		try {
			await updateProfile(data);
			toast({
				title: "プロフィールを更新しました",
				description: "プロフィール情報が正常に更新されました。",
			});
			handleSuccess();
		} catch (error) {
			console.error("Profile update error:", error);
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description:
					error instanceof Error
						? error.message
						: "プロフィールの更新に失敗しました",
			});
		}
	};

	if (!session?.user) {
		return null;
	}

	if (isLoading) {
		return (
			<div className="h-screen grid place-items-center">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<BackLink to="/webapp/setup" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">
					{profileData ? "プロフィール編集" : "プロフィール設定"}
				</h1>

				{error && (
					<div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
						{error}
					</div>
				)}

				<Card>
					<CardHeader>
						<CardTitle>基本情報</CardTitle>
					</CardHeader>
					<CardContent>
						<CreateUserProfileForm
							onSuccess={handleSuccess}
							onSubmit={handleSubmit}
							initialData={{
								email: profileData?.email ?? session?.user?.email ?? "",
								full_name:
									profileData?.full_name ??
									session?.user?.user_metadata?.full_name ??
									"",
								profile_image:
									profileData?.profile_image ?? getUserAvatarUrl(session?.user),
								phone_number: profileData?.phone_number ?? "",
								bio: profileData?.bio ?? "",
							}}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

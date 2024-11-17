import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useOrganization } from "@/hooks/useOrganization";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import type { Organization } from "@/types/organization";

// 組織情報とロールを含む型定義
interface OrganizationWithRole extends Organization {
	role: string;
}

export const SetupUserProfileConfirmPage = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const {
		profileData,
		isLoading: isProfileLoading,
		error: profileError,
	} = useUserProfile();
	const { getOrganizations } = useOrganization();
	const [organizations, setOrganizations] = useState<OrganizationWithRole[]>(
		[],
	);
	const [isOrgLoading, setIsOrgLoading] = useState(true);
	const [orgError, setOrgError] = useState<string | null>(null);

	// 組織情報の取得
	useEffect(() => {
		const loadOrganizations = async () => {
			try {
				const orgs = await getOrganizations();
				setOrganizations(orgs);
			} catch (error) {
				setOrgError(
					error instanceof Error
						? error.message
						: "組織情報の取得に失敗しました",
				);
			} finally {
				setIsOrgLoading(false);
			}
		};

		loadOrganizations();
	}, [getOrganizations]);

	// エラー処理
	useEffect(() => {
		if (profileError) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: profileError,
			});
		}
		if (orgError) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: orgError,
			});
		}
	}, [profileError, orgError, toast]);

	if (isProfileLoading || isOrgLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<LoadingSpinner className="w-8 h-8" />
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<BackLink to="/webapp/setup/organization/confirm" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">
					ユーザー情報の確認
				</h1>

				<div className="space-y-6">
					{/* ユーザー情報カード */}
					<Card>
						<CardHeader>
							<CardTitle>登録済みユーザー情報</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{profileData && (
								<div className="space-y-2">
									<p className="font-medium">氏名: {profileData.full_name}</p>
									{profileData.email && (
										<p>メールアドレス: {profileData.email}</p>
									)}
									{profileData.phone_number && (
										<p>電話番号: {profileData.phone_number}</p>
									)}
									{profileData.bio && <p>自己紹介: {profileData.bio}</p>}
								</div>
							)}

							<div className="flex justify-end">
								<Button
									variant="outline"
									onClick={() => navigate("/webapp/setup/user-profile/edit")}
								>
									ユーザー情報を編集
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* 所属組織情報カード */}
					<Card>
						<CardHeader>
							<CardTitle>所属組織情報</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{organizations.length > 0 ? (
								organizations.map((org) => (
									<div
										key={org.id}
										className="flex justify-between items-center p-4 border rounded-lg"
									>
										<p className="font-medium text-lg">{org.name}</p>
										<span className="text-sm px-2 py-1 bg-muted rounded-full">
											{org.role}
										</span>
									</div>
								))
							) : (
								<p className="text-muted-foreground">
									所属している組織はありません
								</p>
							)}
						</CardContent>
					</Card>

					<div className="flex justify-end space-x-4">
						<Button
							onClick={() => navigate("/webapp/setup/organization/confirm")}
						>
							組織情報に戻る
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

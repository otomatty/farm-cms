import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOrganization } from "@/hooks/useOrganization";
import type { Organization } from "@/types/organization";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const SetupOrganizationConfirmPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const organizationId = location.state?.organizationId;
	const { getOrganization } = useOrganization();
	const [organization, setOrganization] = useState<Organization | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadOrganization = async () => {
			if (!organizationId) {
				setError("組織IDが指定されていません");
				setIsLoading(false);
				return;
			}

			try {
				const org = await getOrganization(organizationId);
				setOrganization(org);
			} catch (error) {
				console.error("組織情報の読み込みに失敗しました:", error);
				setError(
					error instanceof Error
						? error.message
						: "組織情報の読み込みに失敗しました",
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadOrganization();
	}, [organizationId, getOrganization]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<LoadingSpinner className="w-8 h-8" />
			</div>
		);
	}

	if (error || !organization) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="text-2xl font-bold text-red-600 mb-4">
						エラーが発生しました
					</h1>
					<p className="text-gray-600">{error}</p>
					<Button
						className="mt-4"
						onClick={() => navigate("/webapp/setup/organization")}
					>
						組織設定に戻る
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">組織情報の確認</h1>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>組織の作成が完了しました</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{organization && (
							<div className="space-y-2">
								<p className="font-medium">組織名: {organization.name}</p>
								<p>登録番号: {organization.rg_number}</p>
								<p>住所: 〒{organization.postal_code}</p>
								<p className="ml-8">{organization.address}</p>
								{organization.phone_number && (
									<p>電話番号: {organization.phone_number}</p>
								)}
							</div>
						)}
						<Separator className="my-4" />
						<p className="text-sm text-muted-foreground">
							続いて、以下の設定を行うことができます：
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="w-full"
								onClick={() =>
									navigate("/webapp/setup/organization/user-profile")
								}
							>
								ユーザー情報を確認
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => navigate("/webapp/setup/organization/bank")}
							>
								銀行口座を登録
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => navigate("/webapp/setup/organization/invite")}
							>
								メンバーを招待
							</Button>
							<Button className="w-full" onClick={() => navigate("/webapp")}>
								ダッシュボードへ
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

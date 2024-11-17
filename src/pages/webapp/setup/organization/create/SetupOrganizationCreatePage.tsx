import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateOrganizationForm } from "@/components/webapp/forms/CreateOrganizationForm";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	organizationFormSchema,
	type OrganizationFormValues,
} from "@/schemas/organizationSchema";
import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { organizationSetupCompletedAtom } from "@/stores/setup";
import { useOrganization } from "@/hooks/useOrganization";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

export const SetupOrganizationCreatePage = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const setOrganizationCompleted = useSetAtom(organizationSetupCompletedAtom);
	const { createOrganization } = useOrganization();
	const { user, isLoading: isAuthLoading } = useAuth();

	// 認証状態の確認
	useEffect(() => {
		if (!isAuthLoading && !user) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: "ユーザー情報が取得できません。再度ログインしてください。",
			});
			navigate("/auth/signin");
		}
	}, [user, isAuthLoading, navigate, toast]);

	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name: "",
			postal_code: "",
			address: "",
			phone_number: "",
			cellphone_number: "",
			fax_number: "",
			email: "",
			line_id: "",
		},
	});

	const handleSubmit = async (values: OrganizationFormValues) => {
		if (!user) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: "ユーザー情報が取得できません。再度ログインしてください。",
			});
			navigate("/auth/signin");
			return;
		}

		setIsLoading(true);

		try {
			const organization = await createOrganization(values);
			setOrganizationCompleted(true);
			toast({
				title: "組織を作成しました",
				description: `組織「${organization.name}」の登録が完了しました。`,
			});
			navigate("/webapp/setup/organization/confirm", {
				state: { organizationId: organization.id },
			});
		} catch (error) {
			console.error("Organization creation error:", error);
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description:
					error instanceof Error
						? error.message
						: "組織の作成に失敗しました。もう一度お試しください。",
			});
		} finally {
			setIsLoading(false);
		}
	};

	// 認証情報の読み込み中は読み込み画面を表示
	if (isAuthLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<LoadingSpinner className="w-8 h-8" />
			</div>
		);
	}

	// 未認証の場合は何も表示しない（useEffectでリダイレクト）
	if (!user) {
		return null;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<BackLink to="/webapp/setup/organization" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">組織の作成</h1>

				<Card>
					<CardHeader>
						<CardTitle>組織情報</CardTitle>
					</CardHeader>
					<CardContent>
						<CreateOrganizationForm
							form={form}
							onSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JoinOrganizationForm } from "@/components/webapp/forms/JoinOrganizationForm";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { organizationSetupCompletedAtom } from "@/stores/setup";
import type { JoinOrganizationFormValues } from "@/schemas/organizationInviteSchema";

export const SetupOrganizationJoinPage = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const setOrganizationCompleted = useSetAtom(organizationSetupCompletedAtom);

	const handleSubmit = async (values: JoinOrganizationFormValues) => {
		setIsLoading(true);

		try {
			// TODO: Supabaseで招待コードを検証し、組織に参加する処理を実装
			setOrganizationCompleted(true);
			navigate("/webapp");
		} catch (error) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: "組織への参加に失敗しました。",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="mb-8">
					<BackLink to="/webapp/setup/organization" />
				</div>

				<h1 className="text-3xl font-bold text-center mb-8">組織に参加</h1>

				<Card>
					<CardHeader>
						<CardTitle>招待コードを入力</CardTitle>
					</CardHeader>
					<CardContent>
						<JoinOrganizationForm
							onSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

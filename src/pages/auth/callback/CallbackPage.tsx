import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/common/icons";
import { userProfileService } from "@/services/userProfileService";

export const CallbackPage = () => {
	const { handleAuthCallback } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const processCallback = async () => {
			try {
				// デバッグ情報
				console.log("Callback Page Debug:", {
					currentUrl: window.location.href,
					search: window.location.search,
					hash: window.location.hash,
				});

				const { data, error } = await handleAuthCallback();
				console.log("認証コールバックの結果:", { data, error });

				if (error) {
					console.error("認証エラー:", error);
					navigate("/auth/login?error=auth", {
						replace: true,
						state: {
							error: "認証に失敗しました。もう一度お試しください。",
							details: error.message,
						},
					});
					return;
				}

				if (!data?.session) {
					console.error("セッションなし:", data);
					navigate("/auth/login?error=session", {
						replace: true,
						state: { error: "認証セッションの取得に失敗しました。" },
					});
					return;
				}

				// ユーザープロフィールの存在確認
				const hasProfile = await userProfileService.checkUserProfileExists(
					data.session.user.id,
				);

				if (hasProfile) {
					navigate("/webapp", { replace: true });
				} else {
					navigate("/webapp/setup", { replace: true });
				}
			} catch (error) {
				console.error("予期せぬエラーが発生しました:", error);
				navigate("/auth/login?error=unexpected", {
					replace: true,
					state: { error: "認証処理中にエラーが発生しました。" },
				});
			}
		};

		processCallback();
	}, [handleAuthCallback, navigate]);

	return (
		<div className="container min-h-screen grid place-items-center">
			<Card className="w-full max-w-md p-6">
				<div className="flex flex-col items-center justify-center space-y-4">
					<Icons.spinner className="h-8 w-8 animate-spin text-primary" />
					<p className="text-lg font-medium text-center">
						認証を処理しています...
					</p>
					<p className="text-sm text-muted-foreground text-center">
						このページは自動的に遷移します
					</p>
				</div>
			</Card>
		</div>
	);
};

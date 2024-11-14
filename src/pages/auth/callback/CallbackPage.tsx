import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export const CallbackPage = () => {
	const { handleAuthCallback } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const processCallback = async () => {
			try {
				const { data, error } = await handleAuthCallback();

				if (error) {
					console.error("認証エラー:", error.message);
					navigate("/auth/login", {
						replace: true,
						state: { error: "認証に失敗しました。もう一度お試しください。" },
					});
					return;
				}

				if (data.session) {
					// 認証成功時はダッシュボードにリダイレクト
					navigate("/webapp", { replace: true });
				} else {
					// セッションがない場合はログインページに戻る
					navigate("/auth/login", {
						replace: true,
						state: { error: "認証セッションの取得に失敗しました。" },
					});
				}
			} catch (error) {
				console.error("予期せぬエラーが発生しました:", error);
				navigate("/auth/login", {
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { toast } = useToast();

	const handleSuccess = () => {
		setIsSubmitted(true);
		toast({
			title: "メール送信完了",
			description:
				"パスワードリセットのリンクを送信しました。メールをご確認ください。",
		});
	};

	const handleError = () => {
		toast({
			variant: "destructive",
			title: "エラー",
			description: "パスワードリセットに失敗しました。もう一度お試しください。",
		});
	};

	return (
		<div className="container relative min-h-screen grid place-items-center py-8">
			<Button
				variant="ghost"
				className="absolute left-4 top-4 md:left-8 md:top-8"
				asChild
			>
				<Link to="/login">
					<ChevronLeft className="mr-2 h-4 w-4" />
					ログインページへ戻る
				</Link>
			</Button>

			<div className="w-full max-w-md">
				<Card className="border-none sm:border">
					<CardHeader>
						<h1 className="text-2xl font-bold text-center">
							パスワードリセット
						</h1>
						<p className="text-sm text-muted-foreground text-center">
							登録済みのメールアドレスを入力してください
						</p>
					</CardHeader>
					{!isSubmitted ? (
						<CardContent>
							<ResetPasswordForm
								onSuccess={handleSuccess}
								onError={handleError}
							/>
						</CardContent>
					) : (
						<CardContent className="space-y-4">
							<p className="text-center">
								パスワードリセットのリンクを送信しました。
								メールをご確認ください。
							</p>
							<Button className="w-full" onClick={() => navigate("/login")}>
								ログインページへ戻る
							</Button>
						</CardContent>
					)}
				</Card>
			</div>
		</div>
	);
};

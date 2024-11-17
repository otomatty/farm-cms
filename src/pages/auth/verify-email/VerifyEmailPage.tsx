import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VerifyEmailPage = () => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/auth/login");
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-center">メール確認</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-center">
					<Mail className="mx-auto h-12 w-12 text-muted-foreground" />
					<p className="mt-4 text-muted-foreground">
						確認メールを送信しました。メールボックスをご確認ください。
					</p>
				</div>
				<div className="text-sm text-center text-muted-foreground">
					<p>メールが届かない場合は、迷惑メールフォルダもご確認ください。</p>
				</div>
				<Button
					variant="outline"
					className="w-full"
					onClick={handleBackToLogin}
				>
					ログイン画面に戻る
				</Button>
			</CardContent>
		</Card>
	);
};

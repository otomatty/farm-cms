import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await resetPassword(email);
			setIsSubmitted(true);
		} catch (error) {
			console.error("Password reset failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<h1 className="text-2xl font-bold text-center">パスワードリセット</h1>
				</CardHeader>
				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium">
									メールアドレス
								</label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "送信中..." : "リセットリンクを送信"}
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => navigate("/login")}
							>
								ログインページへ戻る
							</Button>
						</CardFooter>
					</form>
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
	);
};

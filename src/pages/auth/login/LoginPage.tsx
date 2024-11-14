import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
	return (
		<div className="container relative min-h-screen grid place-items-center py-8">
			<Button
				variant="ghost"
				className="absolute left-4 top-4 md:left-8 md:top-8"
				asChild
			>
				<Link to="/">
					<ChevronLeft className="mr-2 h-4 w-4" />
					トップページ
				</Link>
			</Button>

			<div className="w-full max-w-md">
				<Card className="border-none sm:border">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							ログイン
						</CardTitle>
						<p className="text-sm text-muted-foreground text-center">
							アカウントにログインしてください
						</p>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Googleボタン */}
						<GoogleAuthButton
							isBlock
							text="Googleアカウントでログイン"
							variant="outline"
						/>

						{/* セパレーター */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center">
								<span className="bg-background px-2 text-xs text-muted-foreground">
									またはメールアドレスでログイン
								</span>
							</div>
						</div>

						{/* ログインフォーム */}
						<LoginForm />

						{/* サインアップページへのリンク */}
						<div className="text-sm text-center text-muted-foreground">
							アカウントをお持ちでない方は{" "}
							<a
								href="/auth/signup"
								className="text-primary underline-offset-4 hover:underline"
							>
								新規登録
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

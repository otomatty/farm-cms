import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/common/icons";
import { RefreshCcw, Eye, EyeOff } from "lucide-react";
import { signUpSchema, type SignUpFormValues } from "@/schemas/auth";
import { generateSecurePassword } from "@/utils/generatePassword";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
	const { signUp } = useAuth();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: SignUpFormValues) => {
		try {
			setIsLoading(true);
			const { error } = await signUp({
				email: values.email,
				password: values.password,
			});

			if (error) {
				toast({
					variant: "destructive",
					title: "サインアップエラー",
					description: getAuthErrorMessage(error.message),
				});
				return;
			}

			navigate("/auth/verify-email", {
				state: { email: values.email },
				replace: true,
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: "しばらく時間をおいて再度お試しください",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGeneratePassword = () => {
		const generatedPassword = generateSecurePassword();
		form.setValue("password", generatedPassword);
		form.setValue("confirmPassword", generatedPassword);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<FormControl>
								<Input
									placeholder="example@example.com"
									type="email"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード</FormLabel>
							<div className="flex gap-2">
								<div className="relative flex-1">
									<FormControl>
										<Input
											placeholder="8文字以上の英数字"
											type={showPassword ? "text" : "password"}
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-2 top-1/2 -translate-y-1/2"
										onClick={() => setShowPassword(!showPassword)}
										disabled={isLoading}
										title={
											showPassword ? "パスワードを隠す" : "パスワードを表示"
										}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={handleGeneratePassword}
									disabled={isLoading}
									title="パスワードを自動生成"
								>
									<RefreshCcw className="h-4 w-4" />
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード（確認）</FormLabel>
							<div className="relative">
								<FormControl>
									<Input
										placeholder="パスワードを再入力"
										type={showConfirmPassword ? "text" : "password"}
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									disabled={isLoading}
									title={
										showConfirmPassword
											? "パスワードを隠す"
											: "パスワードを表示"
									}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					アカウント作成
				</Button>
			</form>
		</Form>
	);
};

// エラーメッセージのヘルパー関数
const getAuthErrorMessage = (errorMessage: string): string => {
	switch (errorMessage) {
		case "User already registered":
			return "このメールアドレスは既に登録されています";
		case "Invalid email":
			return "無効なメールアドレスです";
		case "Signup requires a valid password":
			return "有効なパスワードを入力してください";
		case "Email address cannot be used as it is not authorized":
			return "このメールドメインでの登録は許可されていません";
		default:
			return "サインアップに失敗しました";
	}
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
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
import { Icons } from "@/components/icons";

const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: "メールアドレスを入力してください" })
			.email({ message: "有効なメールアドレスを入力してください" }),
		password: z
			.string()
			.min(8, { message: "パスワードは8文字以上で入力してください" })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
				message: "パスワードは英字と数字を含める必要があります",
			}),
		confirmPassword: z
			.string()
			.min(1, { message: "パスワードを再入力してください" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "パスワードが一致しません",
		path: ["confirmPassword"],
	});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
	const { signUp } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

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
				// エラーメッセージの表示（後でトースト通知などを実装）
				console.error("サインアップエラー:", error.message);
				return;
			}

			// 成功メッセージの表示（後でトースト通知などを実装）
			console.log("サインアップ成功");
		} catch (error) {
			console.error("予期せぬエラーが発生しました:", error);
		} finally {
			setIsLoading(false);
		}
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
							<FormControl>
								<Input
									placeholder="8文字以上の英数字"
									type="password"
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
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード（確認）</FormLabel>
							<FormControl>
								<Input
									placeholder="パスワードを再入力"
									type="password"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
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

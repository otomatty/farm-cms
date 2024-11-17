import * as z from "zod";

export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: "メールアドレスを入力してください" })
			.email({ message: "有効なメールアドレスを入力してください" })
			.transform((email) => email.toLowerCase().trim()),
		password: z
			.string()
			.min(8, { message: "パスワードは8文字以上で入力してください" })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, {
				message: "パスワードは英字、数字、特殊文字を含める必要があります",
			}),
		confirmPassword: z
			.string()
			.min(1, { message: "パスワードを再入力してください" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "パスワードが一致しません",
		path: ["confirmPassword"],
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

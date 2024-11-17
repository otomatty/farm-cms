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
import { Icons } from "@/components/common/icons";

const resetPasswordSchema = z.object({
	email: z
		.string()
		.min(1, { message: "メールアドレスを入力してください" })
		.email({ message: "有効なメールアドレスを入力してください" })
		.transform((email) => email.toLowerCase().trim()),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
	onSuccess: () => void;
	onError: () => void;
	defaultValues?: {
		email: string;
	};
}

export const ResetPasswordForm = ({
	onSuccess,
	onError,
	defaultValues = {
		email: "",
	},
}: ResetPasswordFormProps) => {
	const { resetPassword } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues,
	});

	const onSubmit = async (values: ResetPasswordFormValues) => {
		try {
			setIsLoading(true);
			const { error } = await resetPassword(values.email);

			if (error) {
				onError();
				return;
			}

			onSuccess();
		} catch (error) {
			console.error("Password reset failed:", error);
			onError();
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
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					リセットリンクを送信
				</Button>
			</form>
		</Form>
	);
};

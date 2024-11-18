import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
	email: z.string().email("有効なメールアドレスを入力してください"),
	role: z.enum(["admin", "member"], {
		required_error: "権限を選択してください",
	}),
	message: z.string().optional(),
});

type CreateInvitationFormProps = {
	onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
	onClose: () => void;
};

export function CreateInvitationForm({
	onSubmit,
	onClose,
}: CreateInvitationFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			role: "member",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		await onSubmit(values);
		form.reset();
		onClose();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<FormControl>
								<Input placeholder="email@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>権限</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="権限を選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="member">メンバー</SelectItem>
									<SelectItem value="admin">管理者</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メッセージ（任意）</FormLabel>
							<FormControl>
								<Textarea
									placeholder="招待メッセージを入力"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={onClose}>
						キャンセル
					</Button>
					<Button type="submit">招待を送信</Button>
				</div>
			</form>
		</Form>
	);
}

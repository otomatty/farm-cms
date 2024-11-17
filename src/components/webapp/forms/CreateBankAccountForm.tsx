import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const bankAccountFormSchema = z.object({
	bank_name: z.string().min(1, "銀行名は必須です"),
	branch_name: z.string().min(1, "支店名は必須です"),
	account_type: z.enum(["普通", "当座"], {
		required_error: "口座種別は必須です",
	}),
	account_number: z
		.string()
		.min(1, "口座番号は必須です")
		.regex(/^\d+$/, "口座番号は数字のみ入力可能です"),
	account_holder: z.string().min(1, "口座名義は必須です"),
});

type BankAccountFormValues = z.infer<typeof bankAccountFormSchema>;

interface CreateBankAccountFormProps {
	organizationId: string;
	onSubmit: (values: BankAccountFormValues) => Promise<void>;
	isLoading?: boolean;
}

export function CreateBankAccountForm({
	organizationId,
	onSubmit,
	isLoading = false,
}: CreateBankAccountFormProps) {
	const form = useForm<BankAccountFormValues>({
		resolver: zodResolver(bankAccountFormSchema),
		defaultValues: {
			bank_name: "",
			branch_name: "",
			account_type: undefined,
			account_number: "",
			account_holder: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="bank_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>銀行名 *</FormLabel>
							<FormControl>
								<Input placeholder="○○銀行" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="branch_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>支店名 *</FormLabel>
							<FormControl>
								<Input placeholder="○○支店" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>口座種別 *</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="口座種別を選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="普通">普通</SelectItem>
									<SelectItem value="当座">当座</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>口座番号 *</FormLabel>
							<FormControl>
								<Input placeholder="1234567" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_holder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>口座名義 *</FormLabel>
							<FormControl>
								<Input placeholder="カブシキガイシャ○○" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-2 pt-4">
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "登録中..." : "登録"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

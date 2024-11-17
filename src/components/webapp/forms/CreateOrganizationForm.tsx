import type { UseFormReturn } from "react-hook-form";
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
import type { OrganizationFormValues } from "@/schemas/organizationSchema";
import { usePostalCode } from "@/hooks/usePostalCode";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatPostalCode } from "@/utils/formatPostalCode";
import { BankAccountsTable } from "@/components/webapp/forms/BankAccountsTable";

interface CreateOrganizationFormProps {
	form: UseFormReturn<OrganizationFormValues>;
	onSubmit: (values: OrganizationFormValues) => Promise<void>;
	isLoading?: boolean;
}

export function CreateOrganizationForm({
	form,
	onSubmit,
	isLoading = false,
}: CreateOrganizationFormProps) {
	const { searchAddress, isLoading: isSearching } = usePostalCode();

	const handlePostalCodeChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const rawValue = event.target.value;
		const formattedValue = formatPostalCode(rawValue);

		form.setValue("postal_code", formattedValue);

		const input = event.target;
		const pos = formattedValue.length;
		setTimeout(() => {
			input.setSelectionRange(pos, pos);
		}, 0);

		const cleanedValue = formattedValue.replace(/-/g, "");
		if (cleanedValue.length === 7) {
			try {
				const result = await searchAddress(formattedValue);
				if (result.address) {
					form.setValue("address", result.address);
				} else if (result.error) {
					form.setError("postal_code", {
						type: "manual",
						message: result.error,
					});
				}
			} catch (error) {
				form.setError("postal_code", {
					type: "manual",
					message: "住所の取得に失敗しました",
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>組織名 *</FormLabel>
							<FormControl>
								<Input placeholder="株式会社サンプル" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="postal_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>郵便番号 *</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											placeholder="123-4567"
											{...field}
											onChange={handlePostalCodeChange}
											maxLength={8}
										/>
										{isSearching && (
											<div className="absolute right-3 top-1/2 -translate-y-1/2">
												<LoadingSpinner className="w-4 h-4" />
											</div>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>住所 *</FormLabel>
								<FormControl>
									<Input
										placeholder="東京都渋谷区..."
										{...field}
										readOnly={isSearching}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="phone_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>電話番号</FormLabel>
								<FormControl>
									<Input placeholder="03-1234-5678" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cellphone_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>携帯電話</FormLabel>
								<FormControl>
									<Input placeholder="090-1234-5678" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="fax_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>FAX</FormLabel>
								<FormControl>
									<Input placeholder="03-1234-5679" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>メールアドレス</FormLabel>
								<FormControl>
									<Input placeholder="contact@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="line_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>LINE ID</FormLabel>
								<FormControl>
									<Input placeholder="@example" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="space-y-2">
					<h3 className="text-lg font-medium">登録済み銀行口座</h3>
					<BankAccountsTable />
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? "作成中..." : "組織を作成"}
				</Button>
			</form>
		</Form>
	);
}

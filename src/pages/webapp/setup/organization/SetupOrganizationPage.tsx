import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// バリデーションスキーマ
const organizationFormSchema = z.object({
	name: z.string().min(1, "組織名は必須です"),
	description: z.string().optional(),
	website: z
		.string()
		.url("有効なURLを入力してください")
		.optional()
		.or(z.literal("")),
	address: z.string().min(1, "住所は必須です"),
	phoneNumber: z.string().min(1, "電話番号は必須です"),
	logoUrl: z.string().optional(),
});

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

const SetupOrganizationPage = () => {
	const navigate = useNavigate();
	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name: "",
			description: "",
			website: "",
			address: "",
			phoneNumber: "",
			logoUrl: "",
		},
	});

	const onSubmit = async (data: OrganizationFormValues) => {
		try {
			// TODO: 組織情報の保存処理を実装
			console.log(data);
			navigate("/webapp");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>組織情報設定</CardTitle>
					<CardDescription>組織の基本情報を入力してください</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>組織名</FormLabel>
										<FormControl>
											<Input placeholder="株式会社Example" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>組織概要</FormLabel>
										<FormControl>
											<Textarea
												placeholder="組織の概要を入力してください"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ウェブサイト</FormLabel>
										<FormControl>
											<Input
												type="url"
												placeholder="https://example.com"
												{...field}
											/>
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
										<FormLabel>住所</FormLabel>
										<FormControl>
											<Input placeholder="東京都渋谷区○○1-1-1" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>電話番号</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="03-1234-5678" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/webapp/setup/profile")}
								>
									戻る
								</Button>
								<Button type="submit">完了</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SetupOrganizationPage;

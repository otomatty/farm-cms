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
const profileFormSchema = z.object({
	name: z.string().min(1, "名前は必須です"),
	email: z.string().email("有効なメールアドレスを入力してください"),
	position: z.string().min(1, "役職は必須です"),
	bio: z.string().optional(),
	avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const SetupProfilePage = () => {
	const navigate = useNavigate();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: "",
			email: "",
			position: "",
			bio: "",
			avatarUrl: "",
		},
	});

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			// TODO: プロフィール情報の保存処理を実装
			console.log(data);
			navigate("/webapp/setup/organization");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<Card>
				<CardHeader>
					<CardTitle>プロフィール設定</CardTitle>
					<CardDescription>あなたの基本情報を入力してください</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>名前</FormLabel>
										<FormControl>
											<Input placeholder="山田 太郎" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>メールアドレス</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="taro.yamada@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>役職</FormLabel>
										<FormControl>
											<Input placeholder="マネージャー" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>自己紹介</FormLabel>
										<FormControl>
											<Textarea
												placeholder="自己紹介を入力してください"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/webapp/setup")}
								>
									戻る
								</Button>
								<Button type="submit">次へ</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SetupProfilePage;

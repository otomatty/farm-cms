import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

// バリデーションスキーマ
const organizationSettingsSchema = z.object({
	name: z.string().min(1, "組織名は必須です"),
	postal_code: z.string().regex(/^\d{7}$/, "正しい郵便番号を入力してください"),
	address: z.string().min(1, "住所は必須です"),
	phone_number: z.string().optional(),
	email: z.string().email("正しいメールアドレスを入力してください").optional(),
	main_contact: z.string().optional(),
	bank_info: z.string().optional(),
	rg_number: z.string().optional(),
});

type OrganizationSettingsValues = z.infer<typeof organizationSettingsSchema>;

export const useOrganizationSettings = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// フォームの初期化
	const form = useForm<OrganizationSettingsValues>({
		resolver: zodResolver(organizationSettingsSchema),
		defaultValues: {
			name: "",
			postal_code: "",
			address: "",
		},
	});

	// 組織設定の取得
	const { data: settings, isLoading } = useQuery({
		queryKey: ["organization-settings"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("organizations")
				.select("*")
				.single();

			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			// 取得したデータでフォームを更新
			form.reset(data);
		},
	});

	// 設定の更新
	const updateSettings = useMutation({
		mutationFn: async (values: OrganizationSettingsValues) => {
			const { error } = await supabase
				.from("organizations")
				.update(values)
				.eq("id", settings?.id);

			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["organization-settings"] });
			toast({
				title: "組織設定を更新しました",
			});
		},
		onError: () => {
			toast({
				title: "組織設定の更新に失敗しました",
				variant: "destructive",
			});
		},
	});

	const onSubmit = async (values: OrganizationSettingsValues) => {
		await updateSettings.mutateAsync(values);
	};

	return {
		form,
		isLoading,
		onSubmit,
	};
};

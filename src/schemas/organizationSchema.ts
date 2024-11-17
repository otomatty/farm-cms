import { z } from "zod";

export const organizationFormSchema = z.object({
	name: z
		.string()
		.min(1, "組織名は必須です")
		.max(255, "組織名は255文字以内で入力してください"),
	postal_code: z
		.string()
		.min(1, "郵便番号は必須です")
		.regex(
			/^\d{3}-?\d{4}$/,
			"正しい郵便番号形式で入力してください（例：123-4567）",
		)
		.transform((val) => {
			if (val.includes("-")) return val;
			return `${val.slice(0, 3)}-${val.slice(3)}`;
		}),
	address: z
		.string()
		.min(1, "住所は必須です")
		.max(255, "住所は255文字以内で入力してください"),
	phone_number: z
		.string()
		.regex(/^[0-9-]*$/, "正しい電話番号形式で入力してください")
		.optional(),
	cellphone_number: z
		.string()
		.regex(/^[0-9-]*$/, "正しい電話番号形式で入力してください")
		.optional(),
	fax_number: z
		.string()
		.regex(/^[0-9-]*$/, "正しいFAX番号形式で入力してください")
		.optional(),
	email: z
		.string()
		.email("正しいメールアドレス形式で入力してください")
		.optional(),
	line_id: z
		.string()
		.max(255, "LINE IDは255文字以内で入力してください")
		.optional(),
	main_contact: z
		.string()
		.max(255, "担当者名は255文字以内で入力してください")
		.optional(),
	bank_info: z
		.string()
		.max(1000, "銀行情報は1000文字以内で入力してください")
		.optional(),
	rg_number: z
		.string()
		.max(255, "登録番号は255文字以内で入力してください")
		.optional(),
});

export type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

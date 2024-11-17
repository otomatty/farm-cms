import { z } from "zod";

export const profileFormSchema = z.object({
	email: z.string().email("有効なメールアドレスを入力してください"),
	full_name: z.string().min(1, "氏名は必須です"),
	display_name: z.string().optional(),
	avatar_url: z.string().optional(),
	bio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

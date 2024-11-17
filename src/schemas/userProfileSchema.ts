import { z } from "zod";

export const userProfileSchema = z.object({
	full_name: z.string().min(1, "氏名は必須です"),
	email: z.string().email("有効なメールアドレスを入力してください"),
	phone_number: z.string().optional(),
	profile_image: z.string().optional(),
	bio: z.string().optional(),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;

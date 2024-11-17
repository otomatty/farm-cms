import * as z from "zod";

export const joinOrganizationSchema = z.object({
	invite_code: z
		.string()
		.regex(
			/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
			"招待コードは「XXXX-XXXX-XXXX」の形式で入力してください",
		),
});

export type JoinOrganizationFormValues = z.infer<typeof joinOrganizationSchema>;

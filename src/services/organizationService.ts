import { supabase } from "@/lib/supabase";
import type {
	OrganizationMember,
	RawOrganizationMemberData,
	OrganizationRole,
} from "@/types/organization";

interface InviteParams {
	email: string;
	role: OrganizationRole;
}

export const organizationService = {
	// 組織のメンバー一覧を取得
	async getOrganizationMembers(
		organizationId: string,
	): Promise<OrganizationMember[]> {
		const { data, error } = await supabase
			.from("user_organizations")
			.select(`
        id,
        role,
        created_at,
        user_profiles!inner (
          user_id,
          full_name,
          email,
          profile_image
        )
      `)
			.eq("organization_id", organizationId)
			.order("created_at", { ascending: false });

		if (error) {
			throw new Error("メンバー一覧の取得に失敗しました");
		}

		// 型アサーションを使用して、データベースの結果を既知の型にマッピング
		const rawData = data as unknown as RawOrganizationMemberData[];

		return rawData.map((item) => ({
			id: item.user_profiles.user_id,
			name: item.user_profiles.full_name,
			email: item.user_profiles.email,
			role: item.role,
			profileImage: item.user_profiles.profile_image,
			joinedAt: item.created_at,
		}));
	},

	// メンバーの役割を更新
	async updateMemberRole(
		organizationId: string,
		memberId: string,
		newRole: OrganizationRole,
	): Promise<void> {
		const { error } = await supabase
			.from("user_organizations")
			.update({ role: newRole, updated_at: new Date().toISOString() })
			.eq("organization_id", organizationId)
			.eq("user_id", memberId);

		if (error) {
			throw new Error("メンバーの役割更新に失敗しました");
		}
	},

	// メンバーを削除
	async removeMember(organizationId: string, memberId: string): Promise<void> {
		const { error } = await supabase
			.from("user_organizations")
			.delete()
			.eq("organization_id", organizationId)
			.eq("user_id", memberId);

		if (error) {
			throw new Error("メンバーの削除に失敗しました");
		}
	},

	async inviteMember(
		organizationId: string,
		{ email, role }: InviteParams,
	): Promise<void> {
		// 1. 既存ユーザーのチェック
		const { data: existingUser } = await supabase
			.from("user_profiles")
			.select("user_id")
			.eq("email", email)
			.single();

		// 2. 既に招待済みかチェック
		const { data: existingInvite } = await supabase
			.from("organization_invites")
			.select("id")
			.eq("organization_id", organizationId)
			.eq("email", email)
			.eq("status", "pending")
			.single();

		if (existingInvite) {
			throw new Error("このメールアドレスは既に招待済みです");
		}

		// 3. 既存ユーザーの場合は直接メンバーに追加
		if (existingUser) {
			const { error: memberError } = await supabase
				.from("user_organizations")
				.insert({
					user_id: existingUser.user_id,
					organization_id: organizationId,
					role,
				});

			if (memberError) {
				if (memberError.code === "23505") {
					// unique_violation
					throw new Error("このユーザーは既に組織のメンバーです");
				}
				throw new Error("メンバーの追加に失敗しました");
			}
		} else {
			// 4. 新規ユーザーの場合は招待を作成
			const { error: inviteError } = await supabase
				.from("organization_invites")
				.insert({
					organization_id: organizationId,
					email,
					role,
					status: "pending",
					expires_at: new Date(
						Date.now() + 7 * 24 * 60 * 60 * 1000,
					).toISOString(), // 7日後
				});

			if (inviteError) {
				throw new Error("招待の作成に失敗しました");
			}

			// 5. 招待メールの送信
			// TODO: メール送信機能の実装
			// await sendInvitationEmail(email, inviteToken);
		}
	},
};

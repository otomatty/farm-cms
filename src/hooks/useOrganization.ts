import { useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { OrganizationFormValues } from "@/schemas/organizationSchema";
import { generateRegistrationNumber } from "@/utils/generateRegistrationNumber";
import { useAuth } from "@/hooks/useAuth";
import type {
	Organization,
	UserOrganizationWithDetails,
	OrganizationRole,
} from "@/types/organization";

// Supabaseのクエリ結果の型
interface UserOrganizationResponse {
	organization_id: string;
	role: OrganizationRole;
	organizations: Organization;
}

export const useOrganization = () => {
	const { user } = useAuth();

	// 組織の作成
	const createOrganization = useCallback(
		async (values: OrganizationFormValues): Promise<Organization> => {
			if (!user) {
				throw new Error("ユーザーが認証されていません");
			}

			// 登録番号の生成
			const rgNumber = generateRegistrationNumber();

			// 組織情報の保存
			const { data: organization, error: organizationError } = await supabase
				.from("organizations")
				.insert([
					{
						...values,
						rg_number: rgNumber,
					},
				])
				.select()
				.single();

			if (organizationError || !organization) {
				throw new Error("組織の作成に失敗しました");
			}

			// ユーザーと組織の関連付け
			const { error: userOrgError } = await supabase
				.from("user_organizations")
				.insert([
					{
						user_id: user.id,
						organization_id: organization.id,
						role: "owner" as OrganizationRole, // 作成者はオーナー権限
					},
				]);

			if (userOrgError) {
				// エラーが発生した場合は組織情報を削除
				await supabase.from("organizations").delete().eq("id", organization.id);
				throw new Error("ユーザーと組織の関連付けに失敗しました");
			}

			return organization as Organization;
		},
		[user],
	);

	// 組織の取得(ユーザーが所属するすべての組織)
	const getOrganizations = useCallback(async (): Promise<
		UserOrganizationWithDetails[]
	> => {
		if (!user) {
			throw new Error("ユーザーが認証されていません");
		}

		const { data: userOrgs, error: userOrgsError } = await supabase
			.from("user_organizations")
			.select(`
				organization_id,
				role,
				organizations (
					id,
					name,
					rg_number,
					postal_code,
					address,
					phone_number,
					cellphone_number,
					fax_number,
					email,
					line_id,
					created_at,
					updated_at
				)
			`)
			.eq("user_id", user.id)
			.returns<UserOrganizationResponse[]>();

		if (userOrgsError) {
			throw new Error("組織情報の取得に失敗しました");
		}

		if (!userOrgs) {
			return [];
		}

		return userOrgs.map((userOrg) => ({
			...userOrg.organizations,
			role: userOrg.role,
		}));
	}, [user]);

	// 組織の取得(1つの組織)
	const getOrganization = useCallback(
		async (organizationId: string): Promise<Organization> => {
			if (!user) {
				throw new Error("ユーザーが認証されていません");
			}

			const { data, error } = await supabase
				.from("organizations")
				.select(`
				id,
				name,
				rg_number,
				postal_code,
				address,
				phone_number,
				cellphone_number,
				fax_number,
				email,
				line_id,
				created_at,
				updated_at
			`)
				.eq("id", organizationId)
				.single();

			if (error) {
				throw new Error("組織情報の取得に失敗しました");
			}

			return data as Organization;
		},
		[user],
	);

	return {
		createOrganization,
		getOrganizations,
		getOrganization,
	};
};

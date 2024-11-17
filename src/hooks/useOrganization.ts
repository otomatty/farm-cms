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

// レスポンスの型定義を追加
interface UserOrganizationResponse {
	organization_id: string;
	role: OrganizationRole;
	organizations: {
		id: string;
		name: string;
		rg_number: string;
		postal_code: string;
		address: string;
		phone_number: string | null;
		cellphone_number: string | null;
		fax_number: string | null;
		email: string | null;
		line_id: string | null;
		created_at: string;
		updated_at: string;
	};
}

export const useOrganization = () => {
	const { user, session } = useAuth();

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
		if (!session?.user?.id) {
			console.log("No session or user ID available");
			return [];
		}

		try {
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
				.eq("user_id", session.user.id)
				.returns<UserOrganizationResponse[]>();

			if (userOrgsError) {
				console.error("Failed to fetch organizations:", userOrgsError);
				return [];
			}

			if (!userOrgs?.length) {
				return [];
			}

			// 型安全なマッピング
			const organizations: UserOrganizationWithDetails[] = userOrgs.map(
				(userOrg) => ({
					id: userOrg.organizations.id,
					name: userOrg.organizations.name,
					rg_number: userOrg.organizations.rg_number,
					postal_code: userOrg.organizations.postal_code,
					address: userOrg.organizations.address,
					phone_number: userOrg.organizations.phone_number ?? undefined,
					cellphone_number: userOrg.organizations.cellphone_number ?? undefined,
					fax_number: userOrg.organizations.fax_number ?? undefined,
					email: userOrg.organizations.email ?? undefined,
					line_id: userOrg.organizations.line_id ?? undefined,
					created_at: userOrg.organizations.created_at,
					updated_at: userOrg.organizations.updated_at,
					role: userOrg.role,
				}),
			);

			return organizations;
		} catch (error) {
			console.error("Error in getOrganizations:", error);
			return [];
		}
	}, [session?.user?.id]);

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

	// ユーザーの組織での役割を取得
	const getUserRole = useCallback(
		async (organizationId: string): Promise<OrganizationRole | null> => {
			if (!user) return null;

			const { data, error } = await supabase
				.from("user_organizations")
				.select("role")
				.eq("user_id", user.id)
				.eq("organization_id", organizationId)
				.single();

			if (error || !data) return null;
			return data.role;
		},
		[user],
	);

	// メンバー管理権限のチェック
	const canManageMembers = useCallback(
		async (organizationId: string): Promise<boolean> => {
			const role = await getUserRole(organizationId);
			return role === "owner" || role === "admin";
		},
		[getUserRole],
	);

	// オーナー権限のチェック
	const isOwner = useCallback(
		async (organizationId: string): Promise<boolean> => {
			const role = await getUserRole(organizationId);
			return role === "owner";
		},
		[getUserRole],
	);

	// 管理者権限のチェック
	const isAdmin = useCallback(
		async (organizationId: string): Promise<boolean> => {
			const role = await getUserRole(organizationId);
			return role === "admin";
		},
		[getUserRole],
	);

	return {
		createOrganization,
		getOrganizations,
		getOrganization,
		canManageMembers,
		isOwner,
		isAdmin,
		getUserRole,
	};
};

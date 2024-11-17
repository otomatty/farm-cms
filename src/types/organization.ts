export type InviteStatus = "active" | "used" | "expired" | "disabled";

export interface OrganizationInvite {
	id: number;
	organization_id: number;
	code: string;
	expires_at: string;
	max_uses: number;
	used_count: number;
	created_by: string;
	status: InviteStatus;
	role: string;
	created_at: string;
	updated_at: string;
}

// フォーム用の型定義
export interface JoinOrganizationFormValues {
	invite_code: string;
}

export interface Organization {
	id: string;
	name: string;
	postal_code: string;
	address: string;
	phone_number?: string;
	cellphone_number?: string;
	fax_number?: string;
	email?: string;
	line_id?: string;
	main_contact?: string;
	bank_info?: string;
	rg_number?: string;
	created_at: string;
	updated_at: string;
}

export interface UserOrganization {
	id: number;
	user_id: string;
	organization_id: string;
	role: string;
	created_at: string;
	updated_at: string;
}

// ユーザーが所属している組織の型（Organizationの情報とroleを組み合わせた型）
export interface UserOrganizationWithDetails extends Organization {
	role: string;
}

// roleの型を定義（型安全性の向上）
export type OrganizationRole = "owner" | "admin" | "member";

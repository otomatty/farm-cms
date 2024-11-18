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
	role: OrganizationRole;
	created_at: string;
	updated_at: string;
}

// ユーザーが所属している組織の型（Organizationの情報とroleを組み合わせた型）
export interface UserOrganizationWithDetails extends Organization {
	role: string;
}

// roleの型を定義（型安全性の向上）
export type OrganizationRole = "owner" | "admin" | "member";

// UI用の型定義を追加
export interface OrganizationMember {
	id: string; // user_id
	name: string; // user_profilesから
	email: string; // user_profilesから
	role: OrganizationRole; // UserOrganizationのrole
	joinedAt: string; // UserOrganizationのcreated_at
}

// テーブルのrow型として使用
export interface OrganizationMemberRow extends OrganizationMember {
	actions?: React.ReactNode; // アクションカラム用
}

// データベースから取得する生のデータの型
export interface RawOrganizationMemberData {
	id: number;
	role: OrganizationRole;
	created_at: string;
	user_profiles: {
		user_id: string;
		full_name: string;
		email: string;
		profile_image?: string;
	};
}

// UI用のメンバー情報の型
export interface OrganizationMember {
	id: string; // user_id
	name: string; // full_name
	email: string;
	role: OrganizationRole;
	profileImage?: string;
	joinedAt: string; // created_at
}

// テーブル表示用の拡張型
export interface OrganizationMemberRow extends OrganizationMember {
	actions?: React.ReactNode;
}

export type InvitationStatus = "pending" | "accepted" | "expired" | "canceled";

export interface OrganizationInvitation {
	id: string;
	organization_id: string;
	email: string;
	role: OrganizationRole;
	status: InvitationStatus;
	message?: string;
	expires_at: string;
	created_at: string;
	updated_at: string;
	created_by: string;
}

// UI表示用の招待情報の型
export interface InvitationWithDetails {
	id: string;
	email: string;
	role: OrganizationRole;
	status: InvitationStatus;
	message?: string;
	expiresAt: string;
	createdAt: string;
	createdBy: {
		name: string;
		email: string;
	};
}

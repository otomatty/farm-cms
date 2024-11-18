export interface ContentType {
	id: string;
	name: string;
	description: string;
	icon: string;
	path: string;
	enabled: boolean;
	created_at: string;
	updated_at: string;
}

export interface OrganizationContentSetting {
	id: string;
	organization_id: string;
	content_type_id: string;
	enabled: boolean;
	created_at: string;
	updated_at: string;
}

export interface ContentTypeWithOrgSettings extends ContentType {
	organizationEnabled: boolean;
}

import { supabase } from "@/lib/supabase";
import type { ContentType } from "@/types/content";

class ContentTypeService {
	/**
	 * 組織の全てのコンテンツタイプ設定を取得
	 */
	async getAllForOrganization(organizationId: string): Promise<ContentType[]> {
		const { data, error } = await supabase
			.from("content_types")
			.select(`
				*,
				organization_content_settings!inner(
					enabled,
					organization_id
				)
			`)
			.eq("organization_content_settings.organization_id", organizationId);

		if (error) {
			throw new Error(`Failed to fetch content types: ${error.message}`);
		}

		return data.map((item) => ({
			...item,
			enabled: item.organization_content_settings[0].enabled,
		}));
	}

	/**
	 * 組織のコンテンツタイプ設定を更新
	 */
	async updateOrganizationSetting(
		organizationId: string,
		contentTypeId: string,
		enabled: boolean,
	): Promise<void> {
		const { error } = await supabase
			.from("organization_content_settings")
			.upsert(
				{
					organization_id: organizationId,
					content_type_id: contentTypeId,
					enabled,
				},
				{
					onConflict: "organization_id,content_type_id",
				},
			);

		if (error) {
			throw new Error(
				`Failed to update content type setting: ${error.message}`,
			);
		}
	}

	/**
	 * 新規組織用の初期設定を作成
	 */
	async initializeOrganizationSettings(organizationId: string): Promise<void> {
		const { data: contentTypes, error: fetchError } = await supabase
			.from("content_types")
			.select("id");

		if (fetchError) {
			throw new Error(`Failed to fetch content types: ${fetchError.message}`);
		}

		const settings = contentTypes.map((ct) => ({
			organization_id: organizationId,
			content_type_id: ct.id,
			enabled: true,
		}));

		const { error: insertError } = await supabase
			.from("organization_content_settings")
			.insert(settings);

		if (insertError) {
			throw new Error(`Failed to initialize settings: ${insertError.message}`);
		}
	}
}

export const contentTypeService = new ContentTypeService();

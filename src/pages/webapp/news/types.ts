export interface News {
	id: number;
	title: string;
	summary: string;
	content: string;
	status: "draft" | "published";
	published_at: string | null;
	is_important: boolean;
	display_order: number;
	created_at: string;
	updated_at: string;
}

export interface NewsFormValues {
	title: string;
	summary: string;
	content: string;
	status: "draft" | "published";
	published_at: string | null;
	is_important: boolean;
	display_order: number;
}

export type NewsInput = NewsFormValues;

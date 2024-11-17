import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { News } from "../types";

export function useNewsTable() {
	const [data, setData] = useState<News[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchNews = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data: news, error } = await supabase
				.from("news")
				.select("*")
				.order("display_order", { ascending: true })
				.order("published_at", { ascending: false });

			if (error) throw error;

			setData(news);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("ニュースの取得に失敗しました"),
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// リアルタイム更新のサブスクリプション
	useEffect(() => {
		const subscription = supabase
			.channel("news_changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "news",
				},
				() => {
					fetchNews();
				},
			)
			.subscribe();

		fetchNews();

		return () => {
			subscription.unsubscribe();
		};
	}, [fetchNews]);

	return {
		data,
		isLoading,
		error,
		refetch: fetchNews,
	};
}

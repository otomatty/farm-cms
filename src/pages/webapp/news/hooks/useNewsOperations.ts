import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { NewsFormValues, NewsInput } from "../types";

export function useNewsOperations() {
	const [isLoading, setIsLoading] = useState(false);

	const handleCreate = async (input: NewsFormValues) => {
		try {
			setIsLoading(true);
			const newsInput: NewsInput = {
				...input,
				published_at: input.published_at || null,
			};

			const { error } = await supabase.from("news").insert([newsInput]);

			if (error) throw error;

			toast({
				title: "成功",
				description: "ニュースを作成しました",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "エラー",
				description: "ニュースの作成に失敗しました",
				variant: "destructive",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = async (id: number, input: Partial<NewsFormValues>) => {
		try {
			setIsLoading(true);
			const newsInput: Partial<NewsInput> = {
				...input,
				published_at: input.published_at || null,
			};

			const { error } = await supabase
				.from("news")
				.update(newsInput)
				.eq("id", id);

			if (error) throw error;

			toast({
				title: "成功",
				description: "ニュースを更新しました",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "エラー",
				description: "ニュースの更新に失敗しました",
				variant: "destructive",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			setIsLoading(true);
			const { error } = await supabase.from("news").delete().eq("id", id);

			if (error) throw error;

			toast({
				title: "成功",
				description: "ニュースを削除しました",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "エラー",
				description: "ニュースの削除に失敗しました",
				variant: "destructive",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		handleCreate,
		handleEdit,
		handleDelete,
	};
}

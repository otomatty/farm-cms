import { NewsCreateEditModal } from "./components/NewsCreateEditModal";
import { useNewsTable } from "./hooks/useNewsTable";
import { useNewsOperations } from "./hooks/useNewsOperations";
import { useNewsCreateEditModal } from "./hooks/useNewsCreateEditModal";
import { NewsTable } from "./components/NewsTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import type { NewsFormValues } from "./types";

export const NewsPage = () => {
	const { data, isLoading, error } = useNewsTable();
	const {
		handleCreate,
		handleEdit,
		handleDelete,
		isLoading: isOperating,
	} = useNewsOperations();
	const { isOpen, mode, selectedNews, onOpen, onClose } =
		useNewsCreateEditModal();

	if (error) {
		return (
			<div className="flex justify-center items-center h-[50vh]">
				<p className="text-destructive">エラーが発生しました</p>
			</div>
		);
	}
	const handleSubmit = async (formData: NewsFormValues) => {
		if (mode === "create") {
			await handleCreate(formData);
		} else if (selectedNews) {
			await handleEdit(selectedNews.id, formData);
		}
		onClose();
	};

	return (
		<div className="container mx-auto py-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">お知らせ</h1>

				<NewsCreateEditModal
					isOpen={isOpen}
					mode={mode}
					defaultValues={selectedNews}
					onClose={() => {
						onClose();
					}}
					onSubmit={handleSubmit}
					isSubmitting={isOperating}
				/>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-[50vh]">
					<LoadingSpinner />
				</div>
			) : (
				<NewsTable
					data={data}
					onEdit={(news) => {
						onOpen("edit", news);
					}}
					onDelete={handleDelete}
				/>
			)}
		</div>
	);
};

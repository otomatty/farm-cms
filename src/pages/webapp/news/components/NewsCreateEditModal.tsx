import ResponsiveDialog from "@/components/common/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewsForm } from "./NewsForm";
import type { News, NewsFormValues } from "../types";

interface NewsCreateEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (values: NewsFormValues) => void | Promise<void>;
	defaultValues?: Partial<News>;
	mode: "create" | "edit";
	isSubmitting: boolean;
}

export function NewsCreateEditModal({
	onClose,
	onSubmit,
	defaultValues,
	mode = "create",
	isSubmitting,
}: NewsCreateEditModalProps) {
	return (
		<ResponsiveDialog
			trigger={
				<Button>
					<PlusIcon className="mr-2" /> 新規作成
				</Button>
			}
			title={mode === "create" ? "お知らせ新規作成" : "お知らせ編集"}
			description="お知らせの内容を入力してください"
		>
			<div className="mt-4">
				<NewsForm
					onSubmit={async (values) => {
						await onSubmit(values);
						onClose();
					}}
					defaultValues={defaultValues}
					isSubmitting={isSubmitting}
				/>
			</div>
		</ResponsiveDialog>
	);
}

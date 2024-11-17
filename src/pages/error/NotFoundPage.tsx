import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background">
			<h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
				404
			</h1>
			<p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
				ページが見つかりません
			</p>
			<p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
				お探しのページは存在しないか、移動した可能性があります。
			</p>
			<Button
				onClick={() => navigate(-1)}
				size="lg"
				variant="default"
				className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
			>
				前のページに戻る
			</Button>
		</div>
	);
};

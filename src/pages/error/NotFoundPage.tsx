import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-9xl font-bold text-gray-200">404</h1>
			<p className="text-2xl font-semibold text-gray-600 mt-4">
				ページが見つかりません
			</p>
			<p className="text-gray-500 mt-2 mb-8">
				お探しのページは存在しないか、移動した可能性があります。
			</p>
			<Button onClick={() => navigate("/")} size="lg">
				ホームに戻る
			</Button>
		</div>
	);
};

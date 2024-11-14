import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
	const navigate = useNavigate();

	return (
		<>
			{/* メインコンテンツ */}
			{/* ヒーローセクション */}
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-6">
						アプリケーションへようこそ
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						効率的なタスク管理で、あなたの生産性を向上させましょう。
					</p>
					<Button size="lg" onClick={() => navigate("/auth/signup")}>
						無料で始める
					</Button>
				</div>
			</section>

			{/* 機能紹介セクション */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h3 className="text-3xl font-bold text-center mb-12">主な機能</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* 機能カード */}
						{[
							{
								title: "タスク管理",
								description: "シンプルで使いやすいタスク管理機能",
							},
							{
								title: "プロジェクト管理",
								description: "複数のプロジェクトを効率的に管理できる機能",
							},
							{
								title: "カレンダー",
								description:
									"カレンダーを使用してタスクのスケジュールを管理できる機能",
							},
						].map((feature) => (
							<div key={feature.title} className="text-center">
								<h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

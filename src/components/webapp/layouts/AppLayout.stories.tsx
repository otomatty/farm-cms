import type { Meta, StoryObj } from "@storybook/react";
import AppLayout from "./AppLayout";
import { BrowserRouter } from "react-router-dom";

// セクションのデータ
const sections = [
	{
		id: "dashboard",
		title: "ダッシュボード",
		cards: [
			"プロジェクト概要",
			"タスク進捗",
			"チーム状況",
			"最近の活動",
			"重要なお知らせ",
			"今後の予定",
		],
	},
	{
		id: "activity",
		title: "アクティビティ",
		items: [
			"新しいプロジェクトが作成されました",
			"タスクが完了しました",
			"チームメンバーが追加されました",
			"ミーティングが予定されました",
		],
	},
] as const;

// メインコンテンツのモック
const MockContent = ({ sectionId = "content-1" }: { sectionId?: string }) => (
	<div className="space-y-8">
		<section>
			<h1 className="text-3xl font-bold mb-4">ダッシュボード</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{sections[0].cards.map((title) => (
					<div
						key={`${sectionId}-card-${title}`}
						className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
					>
						<h2 className="text-xl font-semibold mb-2">{title}</h2>
						<p className="text-muted-foreground">
							{title}に関する詳細な情報やデータがここに表示されます。
						</p>
					</div>
				))}
			</div>
		</section>
		<section>
			<h2 className="text-2xl font-semibold mb-4">アクティビティ</h2>
			<div className="space-y-4">
				{sections[1].items.map((activity) => (
					<div
						key={`${sectionId}-activity-${activity}`}
						className="p-4 rounded-md border bg-background/50"
					>
						<p>{activity}</p>
						<p className="text-sm text-muted-foreground">1時間前</p>
					</div>
				))}
			</div>
		</section>
	</div>
);

const meta = {
	title: "Components/WebApp/Layouts/AppLayout",
	component: AppLayout,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {
	render: () => {
		const MockLayout = () => (
			<div className="min-h-screen">
				<AppLayout />
				<MockContent />
			</div>
		);
		return <MockLayout />;
	},
};

// 長いコンテンツでのスクロール
export const WithLongContent: Story = {
	render: () => {
		const MockLayoutWithLongContent = () => (
			<div className="min-h-screen">
				<AppLayout />
				<div className="space-y-8">
					{["section-1", "section-2", "section-3"].map((sectionId) => (
						<MockContent key={sectionId} sectionId={sectionId} />
					))}
				</div>
			</div>
		);
		return <MockLayoutWithLongContent />;
	},
};

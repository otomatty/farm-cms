import type { Meta, StoryObj } from "@storybook/react";
import { AppHeader } from "./AppHeader";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// スクロール用のダミーコンテンツ
const dummyContents = [
	"プロジェクトの概要",
	"タスクの管理方法",
	"チーム collaboration",
	"進捗レポート",
	"リソース管理",
	"スケジュール設定",
	"予算管理",
	"品質管理",
	"リスク管理",
	"コミュニケーション",
	"ドキュメント管理",
	"セキュリティ設定",
	"パフォーマンス分析",
	"カスタマイズオプション",
	"ヘルプとサポート",
	"システム設定",
	"バックアップ管理",
	"ユーザー管理",
	"アクセス権限",
	"監査ログ",
] as const;

// ヘッダーを表示するためのラッパーコンポーネント
const HeaderWrapper = ({
	children,
	hasNotifications = true,
}: {
	children: React.ReactNode;
	hasNotifications?: boolean;
}) => (
	<div
		className="min-h-screen bg-background"
		data-notifications={hasNotifications}
	>
		{children}
		<div className="p-4">
			<p className="text-muted-foreground">
				スクロールするとヘッダーが固定されます。
			</p>
			{dummyContents.map((content) => (
				<p key={content} className="my-4">
					{content}についての説明
				</p>
			))}
		</div>
	</div>
);

const meta = {
	title: "Components/WebApp/Layouts/AppHeader",
	component: AppHeader,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<SidebarProvider>
					<HeaderWrapper>
						<Story />
					</HeaderWrapper>
				</SidebarProvider>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// 通知なしの状態
export const WithoutNotifications: Story = {
	render: () => (
		<HeaderWrapper hasNotifications={false}>
			<AppHeader />
		</HeaderWrapper>
	),
};

import type { Meta, StoryObj } from "@storybook/react";
import { SiteLayout } from "./SiteLayout";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const meta = {
	title: "Components/Site/Layouts/SiteLayout",
	component: SiteLayout,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof SiteLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（最小限のコンテンツ）
export const Default: Story = {
	render: () => {
		const routes = [
			{
				path: "/",
				element: <SiteLayout />,
				children: [
					{
						path: "/",
						element: (
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold mb-6">ようこそ</h1>
								<p className="text-muted-foreground">
									デフォルトのコンテンツです。
								</p>
							</div>
						),
					},
				],
			},
		];

		const router = createMemoryRouter(routes);
		return <RouterProvider router={router} />;
	},
};

// 標準的なコンテンツ
export const WithContent: Story = {
	render: () => {
		const routes = [
			{
				path: "/",
				element: <SiteLayout />,
				children: [
					{
						path: "/",
						element: (
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold mb-6">ページタイトル</h1>
								<div className="prose dark:prose-invert max-w-none">
									<p className="mb-4">
										メインコンテンツの例です。ここにページの主要なコンテンツが表示されます。
									</p>
									<h2 className="text-2xl font-semibold mt-6 mb-4">
										セクション1
									</h2>
									<p className="mb-4">
										セクションの内容がここに入ります。十分な長さのコンテンツを表示することで、
										レイアウトの動作を確認できます。
									</p>
									<h2 className="text-2xl font-semibold mt-6 mb-4">
										セクション2
									</h2>
									<p className="mb-4">
										フッターが適切な位置に表示されることを確認するための追加のコンテンツです。
									</p>
								</div>
							</div>
						),
					},
				],
			},
		];

		const router = createMemoryRouter(routes);
		return <RouterProvider router={router} />;
	},
};

// 長いコンテンツ
export const WithLongContent: Story = {
	render: () => {
		const routes = [
			{
				path: "/",
				element: <SiteLayout />,
				children: [
					{
						path: "/",
						element: (
							<div className="container mx-auto px-4 py-8">
								{[
									"はじめに",
									"サービスの特徴",
									"利用方法",
									"料金プラン",
									"よくある質問",
								].map((section) => (
									<section key={section} className="mb-8">
										<h2 className="text-2xl font-semibold mb-4">{section}</h2>
										<p className="mb-4">
											{section}に関する詳細な説明がここに入ります。
											ユーザーにとって重要な情報を分かりやすく提供します。
										</p>
										<p className="mb-4">
											さらに詳しい情報や具体的な例を示すことで、
											ユーザーの理解を深めることができます。
										</p>
									</section>
								))}
							</div>
						),
					},
				],
			},
		];

		const router = createMemoryRouter(routes);
		return <RouterProvider router={router} />;
	},
};

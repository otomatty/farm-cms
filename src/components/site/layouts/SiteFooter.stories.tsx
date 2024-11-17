import type { Meta, StoryObj } from "@storybook/react";
import { SiteFooter } from "./SiteFooter";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Components/Site/Layouts/SiteFooter",
	component: SiteFooter,
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
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// 長いコンテンツ
export const WithLongContent: Story = {
	decorators: [
		(Story) => (
			<div className="min-h-screen flex flex-col">
				<div className="flex-grow p-4">
					{[
						"はじめに",
						"サービスの特徴",
						"利用方法",
						"料金プラン",
						"よくある質問",
						"お問い合わせ",
						"利用規約",
						"プライバシーポリシー",
						"会社概要",
						"採用情報",
					].map((content) => (
						<p key={content} className="mb-4">
							{content}について
						</p>
					))}
				</div>
				<Story />
			</div>
		),
	],
};

import type { Meta, StoryObj } from "@storybook/react";
import ResponsiveDialog from "./ResponsiveDialog";
import { Button } from "@/components/ui/button";

// サンプルコンテンツの配列
const sampleContents = [
	"スクロール可能なコンテンツ例",
	"ユーザー情報の詳細",
	"設定オプション",
	"追加の説明文",
	"その他の情報",
] as const;

const meta = {
	title: "Components/Common/ResponsiveDialog",
	component: ResponsiveDialog,
	args: {
		title: "ダイアログタイトル",
		description: "ダイアログの説明文がここに入ります。",
		trigger: <Button>ダイアログを開く</Button>,
		children: (
			<div className="p-4">
				<p>ダイアログの内容がここに入ります。</p>
				<p className="mt-4">複数行の内容も表示できます。</p>
			</div>
		),
	},
} satisfies Meta<typeof ResponsiveDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー
export const Default: Story = {};

// カスタムトリガー
export const CustomTrigger: Story = {
	args: {
		trigger: (
			<Button variant="outline" className="bg-primary text-primary-foreground">
				カスタムボタン
			</Button>
		),
	},
};

// 長いコンテンツ
export const LongContent: Story = {
	args: {
		children: (
			<div className="p-4 space-y-4">
				<p>長いコンテンツの例です。</p>
				<p>スクロールが必要な場合の動作を確認できます。</p>
				{sampleContents.map((content) => (
					<p key={content}>{content}</p>
				))}
			</div>
		),
	},
};

// カスタムヘッダー
export const CustomHeader: Story = {
	args: {
		title: "カスタムヘッダー",
		description:
			"より詳細な説明文をここに記述できます。必要に応じて長くすることも可能です。",
	},
};

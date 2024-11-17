import type { Meta, StoryObj } from "@storybook/react";
import { CreateUserProfileForm } from "./CreateUserProfileForm";
import { BrowserRouter } from "react-router-dom";
import type { UserProfileFormValues } from "@/schemas/userProfileSchema";

// モックデータの型定義
interface MockData {
	initialValues?: Partial<UserProfileFormValues>;
	error?: string;
	isLoading?: boolean;
}

// useUserProfileフックのモック
const MockCreateUserProfileForm = () => {
	// useUserProfileフックをモックしてコンポーネントをレンダリング
	return (
		<div className="w-full">
			<CreateUserProfileForm />
		</div>
	);
};

const meta = {
	title: "Components/WebApp/Forms/CreateUserProfileForm",
	component: MockCreateUserProfileForm,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="w-full max-w-md p-6 space-y-6 bg-background rounded-lg border">
					<Story />
				</div>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof MockCreateUserProfileForm>;

export default meta;
type Story = StoryObj<MockData>;

// デフォルトのストーリー
export const Default: Story = {};

// 入力済みの状態
export const Filled: Story = {
	args: {
		initialValues: {
			full_name: "山田 太郎",
			email: "yamada@example.com",
			phone_number: "090-1234-5678",
			bio: "はじめまして。山田太郎です。\nよろしくお願いいたします。",
		},
	},
};

// エラー状態
export const WithError: Story = {
	args: {
		error: "プロフィールの作成に失敗しました。",
	},
};

// 送信中の状態
export const Loading: Story = {
	args: {
		isLoading: true,
	},
};

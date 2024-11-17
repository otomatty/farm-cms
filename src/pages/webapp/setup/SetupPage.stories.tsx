import type { Meta, StoryObj } from "@storybook/react";
import { SetupPage } from "./SetupPage";
import SetupLayout from "@/components/webapp/layouts/SetupLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSetAtom } from "jotai";
import {
	profileSetupCompletedAtom,
	organizationSetupCompletedAtom,
} from "@/stores/setup";
import { useEffect } from "react";

// 状態を設定するためのラッパーコンポーネント
const SetupStateWrapper = ({
	children,
	profileCompleted,
	organizationCompleted,
}: {
	children: React.ReactNode;
	profileCompleted: boolean;
	organizationCompleted: boolean;
}) => {
	const setProfileCompleted = useSetAtom(profileSetupCompletedAtom);
	const setOrganizationCompleted = useSetAtom(organizationSetupCompletedAtom);

	useEffect(() => {
		setProfileCompleted(profileCompleted);
		setOrganizationCompleted(organizationCompleted);
	}, [
		profileCompleted,
		organizationCompleted,
		setProfileCompleted,
		setOrganizationCompleted,
	]);

	return <>{children}</>;
};

const meta = {
	title: "WebApp/Pages/SetupPage",
	component: SetupPage,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="h-screen">
					<SetupLayout>
						<Story />
					</SetupLayout>
				</div>
			</BrowserRouter>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof SetupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのストーリー（何も完了していない状態）
export const Default: Story = {
	decorators: [
		(Story) => (
			<Provider>
				<SetupStateWrapper
					profileCompleted={false}
					organizationCompleted={false}
				>
					<Story />
				</SetupStateWrapper>
			</Provider>
		),
	],
};

// プロフィール設定のみ完了した状態
export const ProfileCompleted: Story = {
	decorators: [
		(Story) => (
			<Provider>
				<SetupStateWrapper
					profileCompleted={true}
					organizationCompleted={false}
				>
					<Story />
				</SetupStateWrapper>
			</Provider>
		),
	],
};

// 組織設定のみ完了した状態
export const OrganizationCompleted: Story = {
	decorators: [
		(Story) => (
			<Provider>
				<SetupStateWrapper
					profileCompleted={false}
					organizationCompleted={true}
				>
					<Story />
				</SetupStateWrapper>
			</Provider>
		),
	],
};

// すべて完了した状態
export const AllCompleted: Story = {
	decorators: [
		(Story) => (
			<Provider>
				<SetupStateWrapper profileCompleted={true} organizationCompleted={true}>
					<Story />
				</SetupStateWrapper>
			</Provider>
		),
	],
};

// ローディング状態のストーリー
export const Loading: Story = {
	parameters: {
		mockData: {
			loading: true,
		},
	},
};

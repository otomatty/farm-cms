import type { Meta, StoryObj } from "@storybook/react";
import { TaskForm } from "./TaskForm";

const meta = {
	title: "WebApp/Forms/TaskForm",
	component: TaskForm,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof TaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なストーリー
export const Default: Story = {
	args: {
		initialData: {
			title: "",
			dueDate: undefined,
			status: "未着手",
		},
		onSubmit: (data) => {
			console.log("Submitted data:", data);
		},
	},
};

// 既存のタスクを編集するケース
export const EditingTask: Story = {
	args: {
		initialData: {
			title: "既存のタスク",
			dueDate: new Date("2024-12-31"),
			status: "進行中",
		},
		onSubmit: (data) => {
			console.log("Submitted data:", data);
		},
	},
};

// 完了済みタスクのケース
export const CompletedTask: Story = {
	args: {
		initialData: {
			title: "完了済みタスク",
			dueDate: new Date("2024-03-15"),
			status: "完了",
		},
		onSubmit: (data) => {
			console.log("Submitted data:", data);
		},
	},
};

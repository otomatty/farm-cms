import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { userEvent } from "@storybook/testing-library";
import { JoinOrganizationForm } from "./JoinOrganizationForm";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Components/WebApp/Forms/JoinOrganizationForm",
	component: JoinOrganizationForm,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="w-full max-w-sm p-4">
					<Story />
				</div>
			</BrowserRouter>
		),
	],
	tags: ["autodocs"],
} satisfies Meta<typeof JoinOrganizationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onSubmit: async (values) => {
			console.log("Form submitted:", values);
		},
		isLoading: false,
	},
};

export const Loading: Story = {
	args: {
		onSubmit: async (values) => {
			console.log("Form submitted:", values);
		},
		isLoading: true,
	},
};

export const WithPrefilledCode: Story = {
	args: {
		onSubmit: async (values) => {
			console.log("Form submitted:", values);
		},
		isLoading: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const inputs = canvas.getAllByRole("textbox");

		// 招待コードを入力する例: "ABCD1234EFGH"
		for (let i = 0; i < inputs.length; i++) {
			await userEvent.type(inputs[i], "ABCD1234EFGH"[i]);
		}
	},
};

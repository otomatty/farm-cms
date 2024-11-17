import type { Meta, StoryObj } from "@storybook/react";
import { SetupOrganizationPage } from "./SetupOrganizationPage";
import SetupLayout from "@/components/webapp/layouts/SetupLayout";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "WebApp/Pages/SetupOrganizationPage",
	component: SetupOrganizationPage,
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
} satisfies Meta<typeof SetupOrganizationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

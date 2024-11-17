import type { RouteObject } from "react-router-dom";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { SetupGuard } from "@/components/guards/SetupGuard";
import { SetupPage } from "@/pages/webapp/setup/SetupPage";
import { SetupProfilePage } from "@/pages/webapp/setup/profile/SetupProfilePage";
import { SetupOrganizationPage } from "@/pages/webapp/setup/organization/SetupOrganizationPage";
import { SetupOrganizationCreatePage } from "@/pages/webapp/setup/organization/create/SetupOrganizationCreatePage";
import { SetupOrganizationJoinPage } from "@/pages/webapp/setup/organization/join/SetupOrganizationJoinPage";
import { SetupOrganizationConfirmPage } from "@/pages/webapp/setup/organization/confirm/SetupOrganizationConfirmPage";
import { SetupUserProfileConfirmPage } from "@/pages/webapp/setup/profile/SetupUserProfileConfirmPage";

export const setupRoutes: RouteObject[] = [
	{
		path: "webapp/setup",
		element: (
			<AuthGuard>
				<SetupGuard skipSetupCheck />
			</AuthGuard>
		),
		children: [
			{
				index: true,
				element: <SetupPage />,
			},
			{
				path: "profile",
				children: [
					{
						index: true,
						element: <SetupProfilePage />,
					},
					{
						path: "confirm",
						element: <SetupUserProfileConfirmPage />,
					},
				],
			},
			{
				path: "organization",
				children: [
					{
						index: true,
						element: <SetupOrganizationPage />,
					},
					{
						path: "create",
						element: <SetupOrganizationCreatePage />,
					},
					{
						path: "join",
						element: <SetupOrganizationJoinPage />,
					},
					{
						path: "confirm",
						element: <SetupOrganizationConfirmPage />,
					},
				],
			},
		],
	},
];

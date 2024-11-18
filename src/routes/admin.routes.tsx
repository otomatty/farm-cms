import type { RouteObject } from "react-router-dom";
import { AdminGuard } from "@/components/guards/AdminGuard";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { SetupGuard } from "@/components/guards/SetupGuard";
import { OrganizationContextGuard } from "@/components/guards/OrganizationContextGuard";
import { AppLayout } from "@/components/webapp/layouts/AppLayout/AppLayout";

// 各ページコンポーネントのインポート
import { UsersPage } from "@/pages/webapp/admin/users/UsersPage";
import { InvitationsPage } from "@/pages/webapp/admin/users/InvitationsPage";
import { ContentSettingsPage } from "@/pages/webapp/admin/contents/ContentSettingsPage";
import { ContentPermissionsPage } from "@/pages/webapp/admin/contents/ContentPermissionsPage";
// import { OrganizationSettingsPage } from "@/pages/webapp/admin/settings/OrganizationSettingsPage";
// import { SecuritySettingsPage } from "@/pages/webapp/admin/security/SecuritySettingsPage";
// import { AuditLogsPage } from "@/pages/webapp/admin/audit/AuditLogsPage";
// import { IntegrationsPage } from "@/pages/webapp/admin/integrations/IntegrationsPage";

export const adminRoutes: RouteObject[] = [
	{
		path: "webapp/admin",
		element: (
			<AuthGuard>
				<SetupGuard>
					<OrganizationContextGuard>
						<AppLayout>
							<AdminGuard />
						</AppLayout>
					</OrganizationContextGuard>
				</SetupGuard>
			</AuthGuard>
		),
		children: [
			{
				path: "users",
				children: [
					{ index: true, element: <UsersPage /> },
					{ path: "invitations", element: <InvitationsPage /> },
				],
			},
			{
				path: "contents",
				children: [
					{ index: true, element: <ContentSettingsPage /> },
					{ path: "permissions", element: <ContentPermissionsPage /> },
				],
			},
			// 	{
			// 		path: "settings",
			// 		element: <OrganizationSettingsPage />,
			// 	},
			// 	{
			// 		path: "security",
			// 		element: <SecuritySettingsPage />,
			// 	},
			// 	{
			// 		path: "audit",
			// 		element: <AuditLogsPage />,
			// 	},
			// 	{
			// 		path: "integrations",
			// 		element: <IntegrationsPage />,
			// 	},
		],
	},
];

import type { RouteObject } from "react-router-dom";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { SetupGuard } from "@/components/guards/SetupGuard";
import { OrganizationContextGuard } from "@/components/guards/OrganizationContextGuard";
import { AppLayout } from "@/components/webapp/layouts/AppLayout/AppLayout";

// メインアプリケーションのページインポート
import { DashboardPage } from "@/pages/webapp/dashboard/DashboardPage";
import { SettingsPage } from "@/pages/webapp/settings/SettingsPage";
import { ProfilePage } from "@/pages/webapp/profile/ProfilePage";
import { BlogsPage } from "@/pages/webapp/blogs/BlogsPage";
import { EventsPage } from "@/pages/webapp/events/EventsPage";
import { TeamMembersPage } from "@/pages/webapp/team-members/TeamMembersPage";
import { TestimonialsPage } from "@/pages/webapp/testimonials/TestimonialsPage";
import { FAQsPage } from "@/pages/webapp/faqs/FAQsPage";
import { GalleryPage } from "@/pages/webapp/gallery/GalleryPage";
import { GuidesPage } from "@/pages/webapp/guides/GuidesPage";
import { InquiriesPage } from "@/pages/webapp/inquiries/InquiriesPage";
import { NewsPage } from "@/pages/webapp/news/NewsPage";
import { NotificationsPage } from "@/pages/webapp/notifications/NotificationsPage";
import { ProductsPage } from "@/pages/webapp/products/ProductsPage";
import { RecruitmentPage } from "@/pages/webapp/recruitment/RecruitmentPage";
import { OrganizationsPage } from "@/pages/webapp/organizations/OrganizationsPage";
import { OrganizationNewPage } from "@/pages/webapp/organizations/new/OrganizationNewPage";

export const webappRoutes: RouteObject[] = [
	{
		path: "/webapp",
		element: (
			<AuthGuard>
				<SetupGuard>
					<OrganizationContextGuard>
						<AppLayout />
					</OrganizationContextGuard>
				</SetupGuard>
			</AuthGuard>
		),

		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: "settings",
				element: <SettingsPage />,
			},
			{
				path: "profile",
				element: <ProfilePage />,
			},
			{
				path: "blogs",
				element: <BlogsPage />,
			},
			{
				path: "events",
				element: <EventsPage />,
			},
			{
				path: "team-members",
				element: <TeamMembersPage />,
			},
			{
				path: "testimonials",
				element: <TestimonialsPage />,
			},
			{
				path: "faqs",
				element: <FAQsPage />,
			},
			{
				path: "gallery",
				element: <GalleryPage />,
			},
			{
				path: "guides",
				element: <GuidesPage />,
			},
			{
				path: "inquiries",
				element: <InquiriesPage />,
			},
			{
				path: "news",
				element: <NewsPage />,
			},
			{
				path: "notifications",
				element: <NotificationsPage />,
			},
			{
				path: "products",
				element: <ProductsPage />,
			},
			{
				path: "recruitment",
				element: <RecruitmentPage />,
			},
			{
				path: "organizations",
				children: [
					{
						index: true,
						element: <OrganizationsPage />,
					},
					{
						path: "new",
						element: <OrganizationNewPage />,
					},
				],
			},
		],
	},
];

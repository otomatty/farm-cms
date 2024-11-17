import { type RouteObject, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/webapp/layouts/AppLayout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SetupPage } from "@/pages/webapp/setup/SetupPage";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { SetupProfilePage } from "@/pages/webapp/setup/SetupProfilePage";
import { SetupOrganizationPage } from "@/pages/webapp/setup/SetupOrganizationPage";
import { SetupOrganizationCreatePage } from "@/pages/webapp/setup/SetupOrganizationCreatePage";
import { SetupOrganizationJoinPage } from "@/pages/webapp/setup/SetupOrganizationJoinPage";
import { useSetupCompletion } from "@/hooks/useSetupCompletion";
import { SetupOrganizationConfirmPage } from "@/pages/webapp/setup/SetupOrganizationConfirmPage";
import { SetupUserProfileConfirmPage } from "@/pages/webapp/setup/SetupUserProfileConfirmPage";
import { OrganizationsPage } from "@/pages/webapp/organizations/OrganizationsPage";
import { OrganizationNewPage } from "@/pages/webapp/organizations/OrganizationNewPage";

const SetupGuard = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isSetupCompleted, isLoading } = useSetupCompletion();

	useEffect(() => {
		if (isLoading) return;

		const isSetupRoute = location.pathname.startsWith("/webapp/setup");

		if (!isSetupCompleted && !isSetupRoute) {
			navigate("/webapp/setup");
		}
	}, [isSetupCompleted, isLoading, location.pathname, navigate]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return <>{children}</>;
};

const ProtectedRoute = ({
	children,
	skipSetupCheck = false,
}: {
	children: React.ReactNode;
	skipSetupCheck?: boolean;
}) => {
	const { session, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session: currentSession },
			} = await supabase.auth.getSession();
			if (!currentSession) {
				navigate("/auth/login");
			}
		};

		checkSession();
	}, [navigate]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!session) {
		return <Navigate to="/auth/login" replace />;
	}

	if (skipSetupCheck) {
		return children;
	}

	return <SetupGuard>{children}</SetupGuard>;
};

export const webappRoutes: RouteObject[] = [
	{
		path: "/webapp/setup",
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute skipSetupCheck>
						<SetupPage />
					</ProtectedRoute>
				),
			},
			{
				path: "profile",
				element: (
					<ProtectedRoute skipSetupCheck>
						<SetupProfilePage />
					</ProtectedRoute>
				),
			},
			{
				path: "organization",
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute skipSetupCheck>
								<SetupOrganizationPage />
							</ProtectedRoute>
						),
					},
					{
						path: "create",
						element: (
							<ProtectedRoute skipSetupCheck>
								<SetupOrganizationCreatePage />
							</ProtectedRoute>
						),
					},
					{
						path: "join",
						element: (
							<ProtectedRoute skipSetupCheck>
								<SetupOrganizationJoinPage />
							</ProtectedRoute>
						),
					},
					{
						path: "confirm",
						element: <SetupOrganizationConfirmPage />,
					},
					{
						path: "user-profile",
						element: <SetupUserProfileConfirmPage />,
					},
				],
			},
		],
	},
	{
		path: "/webapp",
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
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

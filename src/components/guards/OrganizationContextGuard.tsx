import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";

export const OrganizationContextGuard = ({
	children,
}: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { session, isLoading: isAuthLoading } = useAuth();
	const { currentOrganization, loadOrganizations } = useOrganizationSwitcher();
	const [isOrgLoading, setIsOrgLoading] = useState(true);

	useEffect(() => {
		const initializeOrganizations = async () => {
			if (!session?.user?.id) {
				setIsOrgLoading(false);
				return;
			}

			try {
				await loadOrganizations();
			} catch (error) {
				console.error("組織の読み込みに失敗しました:", error);
			} finally {
				setIsOrgLoading(false);
			}
		};

		if (!isAuthLoading) {
			initializeOrganizations();
		}
	}, [session?.user?.id, isAuthLoading, loadOrganizations]);

	useEffect(() => {
		if (isAuthLoading || isOrgLoading) {
			return;
		}

		if (
			!currentOrganization &&
			!location.pathname.startsWith("/webapp/organizations")
		) {
			navigate("/webapp/organizations", {
				replace: true,
				state: { returnPath: location.pathname },
			});
		}
	}, [
		isAuthLoading,
		isOrgLoading,
		currentOrganization,
		navigate,
		location.pathname,
	]);

	if (isAuthLoading || isOrgLoading) {
		return <LoadingSpinner />;
	}

	return <>{children}</>;
};

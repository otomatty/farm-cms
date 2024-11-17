import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useSetupCheck } from "@/hooks/useSetupCheck";

interface SetupGuardProps {
	children?: React.ReactNode;
	skipSetupCheck?: boolean;
}

export const SetupGuard = ({
	children,
	skipSetupCheck = false,
}: SetupGuardProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isSetupCompleted, isLoading } = useSetupCheck();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (isLoading || skipSetupCheck) return;

		const isSetupRoute = location.pathname.startsWith("/webapp/setup");

		if (!isSetupCompleted && !isSetupRoute) {
			setShouldRedirect(true);
		}
	}, [isSetupCompleted, isLoading, location.pathname, skipSetupCheck]);

	// 別のuseEffectでリダイレクト処理を行う
	useEffect(() => {
		if (shouldRedirect) {
			navigate("/webapp/setup");
		}
	}, [shouldRedirect, navigate]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return children ?? <Outlet />;
};

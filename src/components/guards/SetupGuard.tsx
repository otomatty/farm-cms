import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSetupStatus } from "@/hooks/useSetupStatus";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

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
	const { data: setupStatus, isLoading, isError } = useSetupStatus();

	useEffect(() => {
		// ローディング中またはチェックをスキップする場合は何もしない
		if (isLoading || skipSetupCheck) return;

		// エラー時の処理
		if (isError) {
			console.error("Setup status check failed");
			return;
		}

		// setupStatusが未定義の場合は早期リターン
		if (!setupStatus) return;

		const isSetupRoute = location.pathname.startsWith("/webapp/setup");
		const isOrganizationsRoute = location.pathname.startsWith(
			"/webapp/organizations",
		);

		if (setupStatus.isSetupCompleted && isSetupRoute) {
			navigate("/webapp", { replace: true });
			return;
		}

		if (
			!setupStatus.isSetupCompleted &&
			!isSetupRoute &&
			!isOrganizationsRoute
		) {
			navigate("/webapp/setup", { replace: true });
			return;
		}
	}, [
		setupStatus,
		isLoading,
		isError,
		location.pathname,
		navigate,
		skipSetupCheck,
	]);

	// ローディング中は適切なローディング表示
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoadingSpinner className="h-8 w-8" />
			</div>
		);
	}

	// エラー時は子コンポーネントを表示（エラー処理は上位で行う）
	if (isError) {
		return children ?? <Outlet />;
	}

	return children ?? <Outlet />;
};

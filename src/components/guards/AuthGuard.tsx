import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
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

	return <>{children}</>;
};

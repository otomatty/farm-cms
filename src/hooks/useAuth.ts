import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import type {
	AuthError,
	User,
	AuthResponse,
	OAuthResponse,
	Provider,
} from "@supabase/supabase-js";
import supabase from "@/lib/supabase";
import { userAtom, sessionAtom } from "@/stores/authAtom";
import * as authService from "@/services/authService";
import type {
	SignInParams,
	SignUpParams,
	ProfileData,
} from "@/services/authService";

export const useAuth = () => {
	const navigate = useNavigate();
	const [user, setUser] = useAtom(userAtom);
	const [session, setSession] = useAtom(sessionAtom);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = async () => {
			setIsLoading(true);
			try {
				const {
					data: { session: currentSession },
				} = await supabase.auth.getSession();
				if (currentSession) {
					setSession(currentSession);
					setUser(currentSession.user);
				} else {
					setSession(null);
					setUser(null);
				}
			} catch (error) {
				console.error("認証の初期化に失敗しました:", error);
				setSession(null);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN") {
				setSession(session);
				setUser(session?.user ?? null);
			} else if (event === "SIGNED_OUT") {
				setSession(null);
				setUser(null);
				navigate("/auth/login");
			} else if (event === "TOKEN_REFRESHED") {
				setSession(session);
				setUser(session?.user ?? null);
			}
		});

		return () => subscription.unsubscribe();
	}, [setSession, setUser, navigate]);

	const signUp = useCallback(
		async (params: SignUpParams): Promise<AuthResponse> => {
			try {
				return await authService.signUp(params);
			} catch (error) {
				return {
					data: { user: null, session: null },
					error: error as AuthError,
				};
			}
		},
		[],
	);

	const signIn = useCallback(
		async (params: SignInParams): Promise<AuthResponse> => {
			try {
				const result = await authService.signIn(params);
				if (!result.error && result.data.session) {
					navigate("/dashboard");
				}
				return result;
			} catch (error) {
				return {
					data: { user: null, session: null },
					error: error as AuthError,
				};
			}
		},
		[navigate],
	);

	const signOut = useCallback(async (): Promise<{
		error: AuthError | null;
	}> => {
		try {
			const result = await authService.signOut();
			if (!result.error) {
				navigate("/login");
			}
			return result;
		} catch (error) {
			return {
				error: error as AuthError,
			};
		}
	}, [navigate]);

	const resetPassword = useCallback(
		async (email: string): Promise<{ error: AuthError | null }> => {
			try {
				return await authService.resetPassword(email);
			} catch (error) {
				return {
					error: error as AuthError,
				};
			}
		},
		[],
	);

	const updatePassword = useCallback(
		async (
			newPassword: string,
		): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
			try {
				return await authService.updatePassword(newPassword);
			} catch (error) {
				return {
					data: { user: null },
					error: error as AuthError,
				};
			}
		},
		[],
	);

	const updateProfile = useCallback(
		async (
			userData: ProfileData,
		): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
			try {
				return await authService.updateProfile(userData);
			} catch (error) {
				return {
					data: { user: null },
					error: error as AuthError,
				};
			}
		},
		[],
	);

	const signInWithGoogle = useCallback(async (): Promise<OAuthResponse> => {
		try {
			const result = await authService.signInWithGoogle();
			return result;
		} catch (error) {
			return {
				data: { provider: "google" as Provider, url: null },
				error: error as AuthError,
			};
		}
	}, []);

	const handleAuthCallback = useCallback(async () => {
		try {
			const result = await authService.handleAuthCallback();
			if (result.data.session) {
				navigate("/dashboard");
			}
			return result;
		} catch (error) {
			return {
				data: { session: null },
				error: error as AuthError,
			};
		}
	}, [navigate]);

	return {
		user,
		session,
		isLoading,
		signUp,
		signIn,
		signOut,
		resetPassword,
		updatePassword,
		updateProfile,
		signInWithGoogle,
		handleAuthCallback,
		isAuthenticated: !!session,
	} as const;
};

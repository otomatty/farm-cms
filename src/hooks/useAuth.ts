import { useCallback, useEffect } from "react";
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

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const currentSession = await authService.getCurrentSession();
				setSession(currentSession);
				setUser(currentSession?.user ?? null);
			} catch (error) {
				console.error("認証の初期化に失敗しました:", error);
				setSession(null);
				setUser(null);
			}
		};

		initializeAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, [setSession, setUser]);

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

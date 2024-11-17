import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
	AuthError,
	User,
	AuthResponse,
	OAuthResponse,
	Provider,
	Session,
} from "@supabase/supabase-js";
import * as authService from "@/services/authService";
import type { SignInParams, SignUpParams } from "@/services/authService";
import { supabase } from "@/lib/supabase";
import { userProfileService } from "@/services/userProfileService";

export const useAuth = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	// セッションとユーザー情報の初期化と監視
	useEffect(() => {
		// 現在のセッションを取得
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		// セッションの変更を監視
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	// サインアップ
	const signUp = useCallback(
		async (params: SignUpParams): Promise<AuthResponse> => {
			setIsLoading(true);
			try {
				const response = await authService.signUp(params);
				if (response.error) {
					throw response.error;
				}
				if (response.data.user) {
					setUser(response.data.user);
				}
				return response;
			} catch (error) {
				console.error("useAuth signUp error:", error);
				return {
					data: { user: null, session: null },
					error: error as AuthError,
				};
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	// サインイン
	const signIn = useCallback(
		async (params: SignInParams): Promise<AuthResponse> => {
			setIsLoading(true);
			try {
				const result = await authService.signIn(params);
				if (!result.error && result.data.session) {
					setSession(result.data.session);
					setUser(result.data.session.user);

					// プロフィールの存在確認
					const hasProfile = await userProfileService.checkUserProfileExists(
						result.data.session.user.id,
					);

					// 遷移先の振り分け
					if (hasProfile) {
						navigate("/webapp");
					} else {
						navigate("/webapp/setup");
					}
				}
				return result;
			} catch (error) {
				return {
					data: { user: null, session: null },
					error: error as AuthError,
				};
			} finally {
				setIsLoading(false);
			}
		},
		[navigate],
	);

	// サインアウト
	const signOut = useCallback(async (): Promise<{ error: Error | null }> => {
		try {
			// セットアップ状態をクリア
			if (session?.user?.id) {
				localStorage.removeItem(`setup_completed_${session.user.id}`);
			}
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			return { error: null };
		} catch (error) {
			console.error("Error signing out:", error);
			return {
				error:
					error instanceof Error
						? error
						: new Error("サインアウトに失敗しました"),
			};
		}
	}, [session?.user?.id]);

	// パスワードリセット
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

	// パスワード更新
	const updatePassword = useCallback(
		async (
			newPassword: string,
		): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
			try {
				const result = await authService.updatePassword(newPassword);
				if (result.data.user) {
					setUser(result.data.user);
				}
				return result;
			} catch (error) {
				return {
					data: { user: null },
					error: error as AuthError,
				};
			}
		},
		[],
	);

	// Google認証
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

	// 認証コールバック
	const handleAuthCallback = async () => {
		try {
			// URLパラメータの取得方法を修正
			const params = new URLSearchParams(window.location.search);

			// Supabaseの組み込み関数を使用してセッションを取得
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error) {
				console.error("セッション取得エラー:", error);
				throw error;
			}

			if (!session) {
				// セッションがない場合は、URLからの情報を使用して認証を試みる
				const { data, error: exchangeError } =
					await supabase.auth.exchangeCodeForSession(params.get("code") || "");

				if (exchangeError) {
					console.error("コード交換エラー:", exchangeError);
					throw exchangeError;
				}

				return { data, error: null };
			}

			return { data: { session }, error: null };
		} catch (error) {
			console.error("認証コールバックエラー:", error);
			return {
				data: { session: null },
				error:
					error instanceof Error ? error : new Error("Unknown error occurred"),
			};
		}
	};

	return {
		user,
		session,
		isLoading,
		signUp,
		signIn,
		signOut,
		resetPassword,
		updatePassword,
		signInWithGoogle,
		handleAuthCallback,
	} as const;
};

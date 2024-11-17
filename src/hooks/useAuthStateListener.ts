import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/authAtom";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const useAuthStateListener = () => {
	const navigate = useNavigate();
	const [, setUser] = useAtom(userAtom);
	const { toast } = useToast();

	useEffect(() => {
		// 初期認証状態の確認
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				setUser(session.user);
			} else {
				setUser(null);
				navigate("/login");
			}
		});

		// 認証状態の変更を監視
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			async (event: AuthChangeEvent, session) => {
				switch (event) {
					case "SIGNED_IN":
						setUser(session?.user ?? null);
						break;
					case "SIGNED_OUT":
						setUser(null);
						navigate("/login");
						break;
					case "TOKEN_REFRESHED":
						setUser(session?.user ?? null);
						break;
					case "USER_UPDATED":
						setUser(session?.user ?? null);
						break;
					case "PASSWORD_RECOVERY":
						setUser(session?.user ?? null);
						toast({
							title: "パスワードリセット",
							description: "パスワードリセットのリクエストを受け付けました",
						});
						navigate("/auth/reset-password", {
							state: { email: session?.user?.email },
						});
						break;
					default:
						if (session) {
							setUser(session.user);
						} else {
							setUser(null);
							navigate("/login");
						}
				}
			},
		);

		return () => subscription.unsubscribe();
	}, [navigate, setUser, toast]);
};

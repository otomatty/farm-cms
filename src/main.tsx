import type React from "react";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { router } from "./routes";
import supabase from "./lib/supabase";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5分
			retry: 1,
		},
	},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				if (session) {
					await supabase.auth.setSession(session);
				}
			} catch (error) {
				console.error("認証の初期化に失敗しました:", error);
			} finally {
				setIsLoading(false);
				setInitialized(true);
			}
		};

		initializeAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (initialized) {
				setIsLoading(false);
				if (session) {
					console.log("認証済みユーザー:", session.user);
				} else {
					console.log("未認証状態");
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [initialized]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return children;
}

export default function Main() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

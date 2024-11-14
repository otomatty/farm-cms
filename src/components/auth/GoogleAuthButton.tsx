import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Icons } from "@/components/icons";

interface GoogleAuthButtonProps {
	variant?: "default" | "outline";
	isBlock?: boolean;
	text?: string;
}

export const GoogleAuthButton = ({
	variant = "outline",
	isBlock = false,
	text = "Googleでログイン",
}: GoogleAuthButtonProps) => {
	const { signInWithGoogle } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleAuth = async () => {
		try {
			setIsLoading(true);
			const { data, error } = await signInWithGoogle();

			if (error) {
				console.error("Google認証エラー:", error.message);
				return;
			}

			// OAuthのURLが返ってきた場合、そのURLにリダイレクト
			if (data?.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("予期せぬエラーが発生しました:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant={variant}
			onClick={handleGoogleAuth}
			disabled={isLoading}
			className={`${isBlock ? "w-full" : ""} gap-2`}
		>
			{isLoading ? (
				<Icons.spinner className="h-4 w-4 animate-spin" />
			) : (
				<Icons.google className="h-4 w-4" />
			)}
			{text}
		</Button>
	);
};

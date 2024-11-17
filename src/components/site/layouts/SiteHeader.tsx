import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SiteHeader = () => {
	const navigate = useNavigate();

	return (
		<header className="bg-background border-b">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-foreground">
					アプリケーション名
				</h1>
				<nav className="space-x-4">
					<Button
						variant="ghost"
						onClick={() => navigate("/about")}
						className="text-foreground hover:text-foreground"
					>
						About
					</Button>
					<Button
						variant="ghost"
						onClick={() => navigate("/contact")}
						className="text-foreground hover:text-foreground"
					>
						Contact
					</Button>
					<Button
						variant="outline"
						onClick={() => navigate("/auth/login")}
						className="text-foreground"
					>
						ログイン
					</Button>
					<Button onClick={() => navigate("/auth/signup")}>新規登録</Button>
				</nav>
			</div>
		</header>
	);
};

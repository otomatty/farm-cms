import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SiteFooter = () => {
	const navigate = useNavigate();

	return (
		<footer className="bg-muted/50">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-bold mb-4 text-foreground">
							アプリケーション名
						</h3>
						<p className="text-muted-foreground">
							効率的なタスク管理で、あなたの生産性を向上させましょう。
						</p>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-4 text-foreground">リンク</h3>
						<ul className="space-y-2">
							<li>
								<Button
									variant="link"
									onClick={() => navigate("/about")}
									className="text-muted-foreground hover:text-foreground"
								>
									About
								</Button>
							</li>
							<li>
								<Button
									variant="link"
									onClick={() => navigate("/contact")}
									className="text-muted-foreground hover:text-foreground"
								>
									Contact
								</Button>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-4 text-foreground">
							アカウント
						</h3>
						<ul className="space-y-2">
							<li>
								<Button
									variant="link"
									onClick={() => navigate("/auth/login")}
									className="text-muted-foreground hover:text-foreground"
								>
									ログイン
								</Button>
							</li>
							<li>
								<Button
									variant="link"
									onClick={() => navigate("/auth/signup")}
									className="text-muted-foreground hover:text-foreground"
								>
									新規登録
								</Button>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
					<p>&copy; 2024 アプリケーション名. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

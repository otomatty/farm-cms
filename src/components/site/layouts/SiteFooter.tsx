import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SiteFooter = () => {
	const navigate = useNavigate();

	return (
		<footer className="bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-bold mb-4">アプリケーション名</h3>
						<p className="text-gray-600">
							効率的なタスク管理で、あなたの生産性を向上させましょう。
						</p>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-4">リンク</h3>
						<ul className="space-y-2">
							<li>
								<Button variant="link" onClick={() => navigate("/about")}>
									About
								</Button>
							</li>
							<li>
								<Button variant="link" onClick={() => navigate("/contact")}>
									Contact
								</Button>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-4">アカウント</h3>
						<ul className="space-y-2">
							<li>
								<Button variant="link" onClick={() => navigate("/auth/login")}>
									ログイン
								</Button>
							</li>
							<li>
								<Button variant="link" onClick={() => navigate("/auth/signup")}>
									新規登録
								</Button>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
					<p>&copy; 2024 アプリケーション名. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

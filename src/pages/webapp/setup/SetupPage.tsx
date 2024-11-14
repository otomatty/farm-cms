import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const SetupPage = () => {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-8">初期セットアップ</h1>
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>セットアップステップ</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<CheckCircle2 className="h-6 w-6 text-muted-foreground" />
								<div>
									<h3 className="font-semibold">プロフィール設定</h3>
									<p className="text-sm text-muted-foreground">
										ユーザープロフィール情報を設定します
									</p>
								</div>
							</div>
							<Button asChild>
								<Link to="profile">設定する</Link>
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<CheckCircle2 className="h-6 w-6 text-muted-foreground" />
								<div>
									<h3 className="font-semibold">組織情報設定</h3>
									<p className="text-sm text-muted-foreground">
										組織の基本情報を設定します
									</p>
								</div>
							</div>
							<Button asChild>
								<Link to="organization">設定する</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SetupPage;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

export const SettingsPage = () => {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState({
		email: true,
		push: false,
		updates: true,
	});
	const [theme, setTheme] = useState("light");

	const handleNotificationChange = (key: keyof typeof notifications) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">設定</h1>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">一般</TabsTrigger>
					<TabsTrigger value="notifications">通知</TabsTrigger>
					<TabsTrigger value="security">セキュリティ</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>一般設定</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">テーマ設定</h3>
									<p className="text-sm text-gray-500">
										アプリケーションの表示テーマを選択します
									</p>
								</div>
								<select
									value={theme}
									onChange={(e) => setTheme(e.target.value)}
									className="border rounded p-2"
								>
									<option value="light">ライト</option>
									<option value="dark">ダーク</option>
									<option value="system">システム設定に従う</option>
								</select>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">言語設定</h3>
									<p className="text-sm text-gray-500">表示言語を選択します</p>
								</div>
								<select className="border rounded p-2">
									<option value="ja">日本語</option>
									<option value="en">English</option>
								</select>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="notifications">
					<Card>
						<CardHeader>
							<CardTitle>通知設定</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">メール通知</h3>
									<p className="text-sm text-gray-500">
										重要な更新をメールで受け取ります
									</p>
								</div>
								<Switch
									checked={notifications.email}
									onCheckedChange={() => handleNotificationChange("email")}
								/>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">プッシュ通知</h3>
									<p className="text-sm text-gray-500">
										ブラウザのプッシュ通知を受け取ります
									</p>
								</div>
								<Switch
									checked={notifications.push}
									onCheckedChange={() => handleNotificationChange("push")}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="security">
					<Card>
						<CardHeader>
							<CardTitle>セキュリティ設定</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">二段階認証</h3>
								<p className="text-sm text-gray-500">
									アカウントのセキュリティを強化します
								</p>
								<Button variant="outline">設定する</Button>
							</div>

							<div className="space-y-2">
								<h3 className="font-medium">パスワード変更</h3>
								<p className="text-sm text-gray-500">
									定期的なパスワードの変更を推奨します
								</p>
								<Button variant="outline">変更する</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

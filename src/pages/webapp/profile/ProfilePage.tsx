import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export const ProfilePage = () => {
	const { user } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		displayName: user?.user_metadata?.name || "",
		bio: user?.user_metadata?.bio || "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// プロフィール更新ロジックをここに実装
		setIsEditing(false);
	};

	return (
		<div className="container mx-auto py-8">
			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>プロフィール設定</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col items-center mb-6">
						<Avatar className="w-24 h-24">
							<AvatarImage src={user?.user_metadata?.avatar_url} />
							<AvatarFallback>
								{user?.email?.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								メールアドレス
							</label>
							<Input
								id="email"
								type="email"
								value={user?.email || ""}
								disabled
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="displayName" className="text-sm font-medium">
								表示名
							</label>
							<Input
								id="displayName"
								value={profileData.displayName}
								onChange={(e) =>
									setProfileData({
										...profileData,
										displayName: e.target.value,
									})
								}
								disabled={!isEditing}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="bio" className="text-sm font-medium">
								自己紹介
							</label>
							<Input
								id="bio"
								value={profileData.bio}
								onChange={(e) =>
									setProfileData({ ...profileData, bio: e.target.value })
								}
								disabled={!isEditing}
							/>
						</div>

						<div className="flex justify-end gap-4">
							{isEditing ? (
								<>
									<Button
										type="button"
										variant="outline"
										onClick={() => setIsEditing(false)}
									>
										キャンセル
									</Button>
									<Button type="submit">保存</Button>
								</>
							) : (
								<Button type="button" onClick={() => setIsEditing(true)}>
									編集
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

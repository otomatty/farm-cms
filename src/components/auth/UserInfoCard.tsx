import type { User } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoCardProps {
	user: User;
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
	// ユーザーのイニシャルを取得する関数
	const getInitials = (name: string | undefined): string => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<Card>
			<CardContent className="h-full flex flex-col items-center justify-center space-x-4 pt-6">
				<Avatar className="h-32 w-32">
					<AvatarImage src={user.user_metadata?.avatar_url} />
					<AvatarFallback>
						{getInitials(user.user_metadata?.full_name)}
					</AvatarFallback>
				</Avatar>
				<div className="space-y-1 text-center">
					<h3 className="text-lg font-medium">
						{user.user_metadata?.full_name || "ユーザー"}
					</h3>
					<p className="text-sm text-muted-foreground">{user.email}</p>
					<p className="text-xs text-muted-foreground">
						アカウント作成日:{" "}
						{new Date(user.created_at).toLocaleDateString("ja-JP")}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

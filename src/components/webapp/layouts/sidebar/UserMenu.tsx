import { User, ChevronsUpDown, LogOut } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const user = {
	firstName: "太郎",
	lastName: "山田",
	email: "taro.yamada@example.com",
};

export function UserMenu() {
	const navigate = useNavigate();
	const { toast } = useToast();

	// イニシャルを生成する関数
	const getInitials = (firstName: string, lastName: string) => {
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	};

	// ログアウト処理の実装
	const handleLogout = async () => {
		try {
			await supabase.auth.signOut();
			toast({
				title: "成功",
				description: "ログアウトしました",
			});
			navigate("/auth/login"); // ログインページへリダイレクト
		} catch (error) {
			console.error("ログアウトエラー:", error);
			toast({
				title: "エラー",
				description: "ログアウトに失敗しました",
			});
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 mr-2">
								<AvatarFallback>
									{getInitials(user.firstName, user.lastName)}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{`${user.lastName}${user.firstName}`}
								</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end">
						<DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => navigate("/webapp/profile")}
							className="cursor-pointer"
						>
							<User className="mr-2 h-4 w-4" />
							プロフィール
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 dark:text-red-400 cursor-pointer"
						>
							<LogOut className="mr-2 h-4 w-4" />
							ログアウト
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

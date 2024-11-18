import { User, ChevronsUpDown, LogOut, Building2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";

export function UserMenu() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { signOut } = useAuth();
	const { profileData, isLoading } = useUserProfile();

	// イニシャルを生成する関数
	const getInitials = (fullName: string) => {
		return fullName
			.split(" ")
			.map((name) => name.charAt(0))
			.join("")
			.toUpperCase();
	};

	// ログアウト処理
	const handleLogout = async () => {
		try {
			await signOut();
			toast({
				title: "ログアウト",
				description: "ログアウトしました",
			});
			navigate("/auth/login");
		} catch (error) {
			console.error("ログアウトエラー:", error);
			toast({
				title: "エラー",
				description: "ログアウトに失敗しました",
				variant: "destructive",
			});
		}
	};

	if (isLoading) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg">
						<LoadingSpinner className="w-5 h-5" />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	if (!profileData) {
		return null;
	}

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
								<AvatarImage src={profileData.profile_image} />
								<AvatarFallback>
									{getInitials(profileData.full_name)}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{profileData.full_name}
								</span>
								<span className="truncate text-xs">{profileData.email}</span>
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
						<DropdownMenuItem
							onClick={() => navigate("/webapp/organizations")}
							className="cursor-pointer"
						>
							<Building2 className="mr-2 h-4 w-4" />
							組織一覧
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

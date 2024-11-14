import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Menu, Bell, User, Search, HelpCircle, Plus } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const AppHeader = () => {
	const [commandOpen, setCommandOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="px-4 mr-4 flex gap-2 h-14 items-center">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="h-8" />
				<div className="flex items-center gap-4 md:gap-6">
					{/* モバイルメニュートグル */}
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="lg:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">メニューを開く</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-72">
							<SheetHeader>
								<SheetTitle>メニュー</SheetTitle>
							</SheetHeader>
							{/* モバイルメニューの内容 */}
						</SheetContent>
					</Sheet>

					{/* コマンドメニュー（検索） */}
					<Button
						variant="outline"
						className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
						onClick={() => setCommandOpen(true)}
					>
						<Search className="h-4 w-4 xl:mr-2" />
						<span className="hidden xl:inline-flex">検索...</span>
						<kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
							⌘K
						</kbd>
					</Button>
				</div>

				<div className="flex flex-1 items-center justify-end space-x-4">
					{/* 新規作成ボタン */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="sm" className="hidden md:flex">
								<Plus className="mr-2 h-4 w-4" />
								新規作成
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuItem>新規プロジェクト</DropdownMenuItem>
							<DropdownMenuItem>新規タスク</DropdownMenuItem>
							<DropdownMenuItem>新規メンバー招待</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* 通知 */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								<div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center">
									<div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
									<div className="relative inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
										3
									</div>
								</div>
								<span className="sr-only">3件の未読通知があります</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel className="font-bold">通知</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<div className="max-h-[300px] overflow-y-auto">
								<DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
									<div className="flex w-full items-start justify-between">
										<p className="text-sm font-medium">
											新しいタスクが割り当てられました
										</p>
										<div className="h-2 w-2 rounded-full bg-red-500" />
									</div>
									<p className="text-xs text-muted-foreground">5分前</p>
								</DropdownMenuItem>
								<DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
									<div className="flex w-full items-start justify-between">
										<p className="text-sm font-medium">
											プロジェクトが更新されました
										</p>
										<div className="h-2 w-2 rounded-full bg-red-500" />
									</div>
									<p className="text-xs text-muted-foreground">1時間前</p>
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* ヘルプ */}
					<Button variant="ghost" size="icon">
						<HelpCircle className="h-5 w-5" />
					</Button>

					{/* テーマ切り替え */}
					<ThemeSwitcher />
				</div>
			</div>

			{/* コマンドメニューダイアログ */}
			<CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
				<CommandInput placeholder="検索..." />
				<CommandList>
					<CommandEmpty>結果が見つかりません</CommandEmpty>
					<CommandGroup heading="提案">
						<CommandItem>
							<Search className="mr-2 h-4 w-4" />
							<span>プロジェクトを検索</span>
						</CommandItem>
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>メンバーを検索</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</header>
	);
};

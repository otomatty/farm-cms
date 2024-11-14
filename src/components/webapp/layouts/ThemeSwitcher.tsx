import { useAtom } from "jotai";
import { useEffect } from "react";
import { themeAtom } from "@/stores/themeAtom";
import { Sun, Moon, Monitor } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useAtom(themeAtom);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme as "light" | "dark" | "system");
		}
	}, [setTheme]);

	useEffect(() => {
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => {
				document.documentElement.classList.toggle("dark", mediaQuery.matches);
			};
			handleChange();
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const getIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="h-5 w-5" />;
			case "dark":
				return <Moon className="h-5 w-5" />;
			default:
				return <Monitor className="h-5 w-5" />;
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type="button" className="flex items-center space-x-2">
					{getIcon()}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun className="h-5 w-5 mr-2" />
					ライトモード
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon className="h-5 w-5 mr-2" />
					ダークモード
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Monitor className="h-5 w-5 mr-2" />
					システムモード
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

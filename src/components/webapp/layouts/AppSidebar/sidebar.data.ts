import {
	Command,
	AudioWaveform,
	GalleryVerticalEnd,
	ClipboardList,
	BookOpen,
	CalendarDays,
	Package,
	HelpCircle,
	UserCheck,
	Star,
	Image,
	Briefcase,
	Mail,
} from "lucide-react";
import type { Team, MenuItem, User } from "./types";

export const data = {
	user: {
		name: "ユーザー名",
		email: "user@example.com",
		avatar: "/avatars/user.png",
	} as User,

	teams: [
		{
			name: "チームA",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "チームB",
			logo: AudioWaveform,
			plan: "Pro",
		},
		{
			name: "チームC",
			logo: Command,
			plan: "Free",
		},
	] as Team[],

	menuItems: [
		{
			id: "announcements",
			title: "お知らせ",
			path: "/webapp/news",
			icon: ClipboardList,
		},
		{
			id: "blogs",
			title: "ブログ",
			path: "/webapp/blogs",
			icon: BookOpen,
		},
		{
			id: "events",
			title: "イベント",
			path: "/webapp/events",
			icon: CalendarDays,
		},
		{
			id: "products",
			title: "製品情報",
			path: "/webapp/products",
			icon: Package,
		},
		{
			id: "faqs",
			title: "FAQ",
			path: "/webapp/faqs",
			icon: HelpCircle,
		},
		{
			id: "team-members",
			title: "チームメンバー",
			path: "/webapp/team-members",
			icon: UserCheck,
		},
		{
			id: "testimonials",
			title: "顧客の声",
			path: "/webapp/testimonials",
			icon: Star,
		},
		{
			id: "gallery",
			title: "ギャラリー",
			path: "/webapp/gallery",
			icon: Image,
		},
		{
			id: "recruitment",
			title: "採用情報",
			path: "/webapp/recruitment",
			icon: Briefcase,
		},
		{
			id: "inquiries",
			title: "お問い合わせ",
			path: "/webapp/inquiries",
			icon: Mail,
		},
	] as MenuItem[],
};

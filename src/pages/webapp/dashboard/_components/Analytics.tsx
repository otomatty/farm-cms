import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { selectedPeriodAtom } from "@/stores/periodAtom";
import UserChart from "./UserChart";
import SessionChart from "./SessionChart";
import PageViewChart from "./PageViewChart";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const periods = {
	year: "1年",
	sixMonths: "6ヶ月",
	month: "1ヶ月",
	week: "1週間",
};

export default function Analytics({ className }: { className?: string }) {
	const [selectedPeriod, setSelectedPeriod] = useAtom(selectedPeriodAtom);

	return (
		<Card className={cn("p-4 h-full", className)}>
			<Tabs defaultValue="user" className="h-full flex flex-col">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="user">ユーザー数</TabsTrigger>
						<TabsTrigger value="session">セッション数</TabsTrigger>
						<TabsTrigger value="pageview">ページビュー数</TabsTrigger>
					</TabsList>
					<div className="ml-4">
						<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
							<SelectTrigger className="w-full">
								{periods[selectedPeriod as keyof typeof periods]}
							</SelectTrigger>
							<SelectContent>
								{Object.entries(periods).map(([value, label]) => (
									<SelectItem key={value} value={value}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<TabsContent value="user" className="flex-1 flex-shrink-0">
					<UserChart />
				</TabsContent>
				<TabsContent value="session" className="flex-1">
					<SessionChart />
				</TabsContent>
				<TabsContent value="pageview" className="flex-1">
					<PageViewChart />
				</TabsContent>
			</Tabs>
		</Card>
	);
}

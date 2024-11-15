import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MonthlyCalendar from "./MonthlyCalendar";
import UpcomingEvents from "./UpcomingEvents";

export default function EventCalendar({ className }: { className?: string }) {
	return (
		<Card className={cn("p-4 h-full", className)}>
			<Tabs defaultValue="recent">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="recent">
						直近のイベント
					</TabsTrigger>
					<TabsTrigger className="w-full" value="monthly">
						カレンダー
					</TabsTrigger>
				</TabsList>
				<TabsContent value="recent">
					<UpcomingEvents />
				</TabsContent>
				<TabsContent value="monthly">
					<MonthlyCalendar />
				</TabsContent>
			</Tabs>
		</Card>
	);
}

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MonthlyCalendar from "./MonthlyCalendar";
import UpcomingEvents from "./UpcomingEvents";

export default function EventCalendar() {
	return (
		<Card className="p-4 h-full">
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

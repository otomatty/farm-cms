import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateLong } from "@/utils/formatDate";

interface EventSheetProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	selectedDate: string | null;
	events: { date: string; time?: string; title: string }[];
}

export default function EventSheet({
	isOpen,
	onOpenChange,
	selectedDate,
	events,
}: EventSheetProps) {
	// 選択された日のイベントを時間順にソート
	const sortedEvents = events
		.filter((event) => event.date === selectedDate)
		.sort((a, b) => (a.time || "").localeCompare(b.time || ""));

	// 24時間のタイムラインを作成
	const hours = Array.from(
		{ length: 24 },
		(_, i) => `${String(i).padStart(2, "0")}:00`,
	);

	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<div />
			</SheetTrigger>
			<SheetContent className="flex flex-col justify-between gap-4">
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">
						{sortedEvents.length > 0
							? formatDateLong(sortedEvents[0].date)
							: "日付未選択"}
						の予定
					</h3>
					<p className="text-sm text-gray-600">
						本日の予定:{sortedEvents.length}件
					</p>
				</div>
				<ScrollArea className="h-[calc(100vh-100px)] mt-4">
					{hours.map((hour) => (
						<div key={hour} className="flex items-center border-b py-2">
							<div className="w-20 text-right pr-4 text-gray-500">{hour}</div>
							<div className="flex-1 pl-4 relative">
								{sortedEvents
									.filter((event) => event.time?.startsWith(hour))
									.map((event) => (
										<div
											key={event.time}
											className="absolute left-0 bg-blue-100 p-2 rounded shadow-md"
										>
											{event.title}
										</div>
									))}
							</div>
						</div>
					))}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

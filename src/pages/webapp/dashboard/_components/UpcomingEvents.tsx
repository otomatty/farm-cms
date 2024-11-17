import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateLong } from "@/utils/formatDate";
import { events } from "@/data/events"; // イベントデータをインポート
import { Button } from "@/components/ui/button"; // ボタンコンポーネントをインポート

export default function UpcomingEvents() {
	// 現在の日付を取得
	const today = new Date();
	today.setHours(0, 0, 0, 0); // 時間をリセットして日付のみを比較

	// 日付でソートし、現在の日付以降の最大5つのイベントを取得
	const sortedEvents = events
		.filter((event) => new Date(event.date) >= today)
		.sort((a, b) => a.date.localeCompare(b.date))
		.slice(0, 5);

	return (
		<div className="flex flex-col justify-between">
			<ScrollArea className="h-[360px]">
				<div className="space-y-4 h-full">
					{sortedEvents.length === 0 ? (
						<div className="text-center h-full flex items-center justify-center text-gray-500">
							イベントがありません
						</div>
					) : (
						sortedEvents.map((event, index) => {
							const showSeparator =
								index > 0 && event.date !== sortedEvents[index - 1].date;
							return (
								<React.Fragment key={event.id}>
									{showSeparator && (
										<div className="flex items-center my-4">
											<div className="flex-grow border-t border-gray-300" />
											<span className="mx-2 text-sm text-gray-500">
												{formatDateLong(event.date)}
											</span>
											<div className="flex-grow border-t border-gray-300" />
										</div>
									)}
									<div className="p-4 border rounded shadow">
										<h3 className="text-lg font-bold">{event.title}</h3>
										<p className="text-sm text-gray-500">
											{formatDateLong(event.date)}
										</p>
										<p>{event.description}</p>
									</div>
								</React.Fragment>
							);
						})
					)}
				</div>
			</ScrollArea>
			<div>
				<Button variant="outline" className="mt-4 w-full">
					カレンダーを確認する
				</Button>
			</div>
		</div>
	);
}

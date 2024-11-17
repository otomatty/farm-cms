import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventSheet from "./EventSheet";
import { events } from "@/data/events"; // イベントデータをインポート

// ヘルパー関数: 月の日数を取得
const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

// ヘルパー関数: 月の初日の曜日を取得
const getFirstDayOfMonth = (year: number, month: number) => {
	return new Date(year, month, 1).getDay();
};

export default function MonthlyCalendar() {
	const today = new Date();
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

	// 月を変更する関数
	const goToPreviousMonth = () => {
		if (currentMonth === 0) {
			setCurrentYear(currentYear - 1);
			setCurrentMonth(11);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const goToNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentYear(currentYear + 1);
			setCurrentMonth(0);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	// 日付をレンダリング
	const renderDays = () => {
		const days = [];
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(<div key={`empty-${i}`} className="p-2" />);
		}
		for (let day = 1; day <= daysInMonth; day++) {
			const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
			const event = events.find((event) => event.date === dateString);

			days.push(
				<button
					type="button"
					key={day}
					className="p-2 border rounded-sm border-gray-300 relative cursor-pointer"
					onClick={() => {
						setSelectedDate(dateString);
						setIsSheetOpen(true);
					}}
				>
					{day}
					{event && (
						<div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
					)}
				</button>,
			);
		}
		return days;
	};

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between items-center mb-4">
				<Button variant="outline" onClick={goToPreviousMonth}>
					<ChevronLeft />
				</Button>
				<h2 className="text-lg font-semibold">
					{currentYear}年 {currentMonth + 1}月
				</h2>
				<Button variant="outline" onClick={goToNextMonth}>
					<ChevronRight />
				</Button>
			</div>
			<div className="grid grid-cols-7 gap-2">
				{["日", "月", "火", "水", "木", "金", "土"].map((day) => (
					<div key={day} className="text-center font-bold ">
						{day}
					</div>
				))}
				{renderDays()}
			</div>

			{/* シートコンポーネントを使用 */}
			<EventSheet
				isOpen={isSheetOpen}
				onOpenChange={setIsSheetOpen}
				selectedDate={selectedDate}
				events={events}
			/>
			<Button variant="outline" className="mt-4 w-full">
				カレンダーを確認する
			</Button>
		</div>
	);
}

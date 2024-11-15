import { useEffect } from "react";
import TaskList from "./components/TaskList";
import Analytics from "./components/Analytics";
import RecentInquiries from "./components/RecentInquiries";
import UpdateHistory from "./components/UpdateHistory";
import EventCalendar from "./components/EventCalendar";

export const DashboardPage = () => {
	useEffect(() => {
		// ダッシュボードデータの取得や初期化処理
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
			<Analytics className="md:col-span-2 lg:col-span-4" />
			<EventCalendar className="md:col-span-2 lg:col-span-2" />
			<TaskList className="md:col-span-1 lg:col-span-2" />
			<RecentInquiries className="md:col-span-1 lg:col-span-2" />
			<UpdateHistory className="md:col-span-1 lg:col-span-2" />
		</div>
	);
};

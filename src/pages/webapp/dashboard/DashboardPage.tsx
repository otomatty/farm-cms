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
		<div className="p-4 mx-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
				<div className="md:col-span-1 lg:col-span-6 bg-red-200">
					<Analytics />
				</div>
				<div className="md:col-span-1 lg:col-span-6 bg-blue-200">
					<EventCalendar />
				</div>
				<div className="md:col-span-2 lg:col-span-4 bg-green-200">
					<TaskList />
				</div>
				<div className="md:col-span-2 lg:col-span-4 bg-yellow-200">
					<RecentInquiries />
				</div>
				<div className="md:col-span-2 lg:col-span-4 bg-purple-200">
					<UpdateHistory />
				</div>
			</div>
		</div>
	);
};

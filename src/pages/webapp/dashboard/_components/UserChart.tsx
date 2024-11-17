import { useAtom } from "jotai";
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { selectedPeriodAtom } from "@/stores/periodAtom";
import { userData, dailyUserData } from "@/data/dashboardAnalytics.data";
import type { UserData } from "@/types/dashboardAnalytics";
import { ArrowUp, ArrowDown } from "lucide-react";

const chartConfig = {};

export default function UserChart() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom);

	const filterDataByPeriod = (data: UserData[]): UserData[] => {
		switch (selectedPeriod) {
			case "year":
				return userData;
			case "sixMonths":
				return userData.slice(-6);
			case "month":
				return dailyUserData.slice(-30);
			case "week":
				return dailyUserData.slice(-7);
			default:
				return userData;
		}
	};

	const filteredData = filterDataByPeriod(
		selectedPeriod === "year" || selectedPeriod === "sixMonths"
			? userData
			: dailyUserData,
	);

	let currentPeriodUsers = 0;
	let previousPeriodUsers = 0;
	let comparison = 0;

	if (selectedPeriod === "week" || selectedPeriod === "month") {
		currentPeriodUsers = dailyUserData
			.slice(-7)
			.reduce((sum, data) => sum + data.users, 0);
		previousPeriodUsers = dailyUserData
			.slice(-14, -7)
			.reduce((sum, data) => sum + data.users, 0);
	} else if (selectedPeriod === "sixMonths" || selectedPeriod === "year") {
		currentPeriodUsers = userData.slice(-1)[0].users;
		previousPeriodUsers = userData.slice(-2, -1)[0].users;
	}

	comparison =
		((currentPeriodUsers - previousPeriodUsers) / previousPeriodUsers) * 100;

	return (
		<div className="flex mt-8">
			<div className="mr-8">
				<p className="text-sm mb-2">
					{selectedPeriod === "week" || selectedPeriod === "month"
						? "今週のユーザー数"
						: "今月のユーザー数"}
				</p>
				<h2 className="text-4xl mb-4 font-bold">{currentPeriodUsers}</h2>
				<div>
					<p className="text-sm">
						先
						{selectedPeriod === "week" || selectedPeriod === "month"
							? "週"
							: "月"}
						のユーザー数
					</p>
					<p className="text-lg">{previousPeriodUsers}</p>
				</div>
				<div>
					<p className="text-sm">
						前
						{selectedPeriod === "week" || selectedPeriod === "month"
							? "週"
							: "月"}
						比
					</p>
					<p
						className={`text-lg flex items-center ${comparison >= 0 ? "text-green-500" : "text-red-500"}`}
					>
						{comparison.toFixed(2)}%
						{comparison >= 0 ? (
							<ArrowUp className="ml-1" />
						) : (
							<ArrowDown className="ml-1" />
						)}
					</p>
				</div>
			</div>
			<ChartContainer config={chartConfig} className="flex-1">
				<BarChart data={filteredData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey={
							selectedPeriod === "year" || selectedPeriod === "sixMonths"
								? "month"
								: "date"
						}
					/>
					<Tooltip content={<ChartTooltipContent />} />
					<Bar dataKey="users" fill="#8884d8" />
				</BarChart>
			</ChartContainer>
		</div>
	);
}

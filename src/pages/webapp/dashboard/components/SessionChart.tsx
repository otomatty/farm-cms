import { useAtom } from "jotai";
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	Tooltip,
	YAxis,
	LabelList,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { selectedPeriodAtom } from "@/stores/periodAtom";
import { sessionData, dailySessionData } from "@/data/dashboardAnalytics.data";
import type { SessionData } from "@/types/dashboardAnalytics";
import { ArrowUp, ArrowDown } from "lucide-react";

const chartConfig = {};

export default function SessionChart() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom);

	const filterDataByPeriod = (data: SessionData[]): SessionData[] => {
		switch (selectedPeriod) {
			case "year":
				return sessionData;
			case "sixMonths":
				return sessionData.slice(-6);
			case "month":
				return dailySessionData.slice(-30); // 直近30日分のデータを表示
			case "week":
				return dailySessionData.slice(-7); // 直近7日分のデータを表示
			default:
				return sessionData;
		}
	};

	const filteredData = filterDataByPeriod(
		selectedPeriod === "year" || selectedPeriod === "sixMonths"
			? sessionData
			: dailySessionData,
	);

	// 数値の計算
	let currentPeriodSessions = 0;
	let previousPeriodSessions = 0;
	let comparison = 0;

	if (selectedPeriod === "week" || selectedPeriod === "month") {
		currentPeriodSessions = dailySessionData
			.slice(-7)
			.reduce((sum, data) => sum + data.sessions, 0);
		previousPeriodSessions = dailySessionData
			.slice(-14, -7)
			.reduce((sum, data) => sum + data.sessions, 0);
	} else if (selectedPeriod === "sixMonths" || selectedPeriod === "year") {
		currentPeriodSessions = sessionData.slice(-1)[0].sessions;
		previousPeriodSessions = sessionData.slice(-2, -1)[0].sessions;
	}

	comparison =
		((currentPeriodSessions - previousPeriodSessions) /
			previousPeriodSessions) *
		100;

	return (
		<div className="mt-8 flex">
			<div className="mr-8 min-w-[160px]">
				<p className="text-sm mb-2">
					{selectedPeriod === "week" || selectedPeriod === "month"
						? "今週のセッション数"
						: "今月のセッション数"}
				</p>
				<h2 className="text-4xl mb-4 font-bold">{currentPeriodSessions}</h2>
				<div>
					<p className="text-sm">
						先
						{selectedPeriod === "week" || selectedPeriod === "month"
							? "週"
							: "月"}
						のセッション数
					</p>
					<p className="text-lg">{previousPeriodSessions}</p>
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
			<ChartContainer config={chartConfig} className="w-full">
				<BarChart data={filteredData} layout="vertical" margin={{ right: 16 }}>
					<CartesianGrid horizontal={false} />
					<YAxis
						dataKey={
							selectedPeriod === "year" || selectedPeriod === "sixMonths"
								? "month"
								: "date"
						}
						type="category"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<XAxis dataKey="sessions" type="number" hide />
					<Tooltip content={<ChartTooltipContent />} />
					<Bar dataKey="sessions" layout="vertical" fill="#82ca9d" radius={4}>
						<LabelList
							dataKey={
								selectedPeriod === "year" || selectedPeriod === "sixMonths"
									? "month"
									: "date"
							}
							position="insideLeft"
							offset={8}
							className="fill-[--color-label]"
							fontSize={12}
						/>
						<LabelList
							dataKey="sessions"
							position="right"
							offset={8}
							className="fill-foreground"
							fontSize={12}
						/>
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}

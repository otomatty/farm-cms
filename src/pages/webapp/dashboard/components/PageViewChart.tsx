import { useAtom } from "jotai";
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	LabelList,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { selectedPeriodAtom } from "@/stores/periodAtom";
import {
	pageViewData,
	dailyPageViewData,
} from "@/data/dashboardAnalytics.data";
import type { PageViewData } from "@/types/dashboardAnalytics";

const chartConfig = {};

// 仮のページビュー数データ
const topPages = [
	{ page: "/home", views: 1200 },
	{ page: "/about", views: 900 },
	{ page: "/contact", views: 750 },
];

export default function PageViewChart() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom);

	const filterDataByPeriod = (data: PageViewData[]): PageViewData[] => {
		switch (selectedPeriod) {
			case "year":
				return pageViewData;
			case "sixMonths":
				return pageViewData.slice(-3);
			case "month":
				return dailyPageViewData.slice(-30);
			case "week":
				return dailyPageViewData.slice(-7);
			default:
				return pageViewData;
		}
	};

	const filteredData = filterDataByPeriod(
		selectedPeriod === "year" || selectedPeriod === "sixMonths"
			? pageViewData
			: dailyPageViewData,
	);

	// 数値��計算
	let currentPeriodViews = 0;
	let previousPeriodViews = 0;
	let comparison = 0;

	if (selectedPeriod === "week" || selectedPeriod === "month") {
		currentPeriodViews = dailyPageViewData
			.slice(-7)
			.reduce((sum, data) => sum + data.value, 0);
		previousPeriodViews = dailyPageViewData
			.slice(-14, -7)
			.reduce((sum, data) => sum + data.value, 0);
	} else if (selectedPeriod === "sixMonths" || selectedPeriod === "year") {
		currentPeriodViews = pageViewData.slice(-1)[0].value;
		previousPeriodViews = pageViewData.slice(-2, -1)[0].value;
	}

	comparison =
		((currentPeriodViews - previousPeriodViews) / previousPeriodViews) * 100;

	return (
		<div className="mt-8">
			<ChartContainer config={chartConfig} className="mr-8">
				<BarChart layout="vertical" data={filteredData} margin={{ right: 16 }}>
					<CartesianGrid horizontal={false} />
					<YAxis
						dataKey="name"
						type="category"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<XAxis type="number" />
					<Tooltip content={<ChartTooltipContent />} />
					<Bar dataKey="value" fill="#8884d8" radius={4}>
						{/* <LabelList
							dataKey="name"
							position="insideLeft"
							offset={8}
							className="fill-foreground"
							fontSize={12}
						/> */}
						<LabelList
							dataKey="value"
							position="right"
							offset={8}
							className="fill-foreground"
							fontSize={12}
						/>
					</Bar>
				</BarChart>
			</ChartContainer>
			{/* <div className="min-w-[260px]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ページ</TableHead>
							<TableHead>ビュー数</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topPages.map((page) => (
							<TableRow key={page.page}>
								<TableCell>{page.page}</TableCell>
								<TableCell>{page.views.toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div> */}
		</div>
	);
}

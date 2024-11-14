import type {
	UserData,
	SessionData,
	PageViewData,
} from "@/types/dashboardAnalytics";

type DataType = UserData | SessionData | PageViewData;

export function filterDataByPeriod<T extends DataType>(
	data: T[],
	period: string,
): T[] {
	switch (period) {
		case "year":
			return data;
		case "sixMonths":
			return data.slice(-6);
		case "month":
			return data.slice(-1);
		case "week":
			return data.slice(-1);
		default:
			return data;
	}
}

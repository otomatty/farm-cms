export interface Event {
	id: string;
	title: string;
	date: string;
	time?: string; // Optional for events without specific time
	description?: string; // Optional for events without description
}

export const events: Event[] = [
	{
		id: "1",
		title: "イベント1",
		date: "2024-11-13",
		time: "10:00",
		description: "詳細情報1",
	},
	{
		id: "2",
		title: "イベント2",
		date: "2024-11-13",
		time: "14:00",
		description: "詳細情報2",
	},
	{
		id: "3",
		title: "イベント3",
		date: "2024-11-13",
		time: "16:00",
		description: "詳細情報3",
	},
	{
		id: "4",
		title: "イベント4",
		date: "2024-11-15",
		time: "09:00",
		description: "詳細情報4",
	},
	{
		id: "5",
		title: "イベント5",
		date: "2024-11-15",
		time: "11:00",
		description: "詳細情報5",
	},
	{
		id: "6",
		title: "イベント6",
		date: "2024-11-15",
		time: "13:00",
		description: "詳細情報6",
	},
	// 他のイベントデータ
];

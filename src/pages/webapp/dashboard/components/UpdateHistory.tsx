import { Card } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";

export default function UpdateHistory() {
	const updates = [
		{ id: 1, description: "更新1", date: "2023-10-01" },
		{ id: 2, description: "更新2", date: "2023-10-02" },
		// 他の更新
	];

	return (
		<Card className="p-4 h-full">
			<h2 className="text-lg font-semibold">更新履歴</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>説明</TableHead>
						<TableHead>日付</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{updates.map((update) => (
						<TableRow key={update.id}>
							<TableCell>{update.description}</TableCell>
							<TableCell>{update.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

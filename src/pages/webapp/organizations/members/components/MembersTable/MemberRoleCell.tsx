import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const MemberRoleCell = ({ member }) => {
	// TODO: 役割更新のロジック実装
	const handleRoleChange = (value: string) => {
		console.log(value);
	};

	return (
		<Select defaultValue={member.role} onValueChange={handleRoleChange}>
			<SelectTrigger className="w-32">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="member">メンバー</SelectItem>
				<SelectItem value="admin">管理者</SelectItem>
			</SelectContent>
		</Select>
	);
};

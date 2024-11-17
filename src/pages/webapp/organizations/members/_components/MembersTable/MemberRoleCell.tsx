import type {
	OrganizationMember,
	OrganizationRole,
} from "@/types/organization";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	member: OrganizationMember;
}

export const MemberRoleCell = ({ member }: Props) => {
	const handleRoleChange = (value: OrganizationRole) => {
		// TODO: 役割更新のロジック実装
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
				<SelectItem value="owner">オーナー</SelectItem>
			</SelectContent>
		</Select>
	);
};

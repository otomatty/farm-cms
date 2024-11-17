import type { OrganizationMember } from "@/types/organization";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
	member: OrganizationMember;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const DeleteMemberDialog = ({ member, open, onOpenChange }: Props) => {
	const { toast } = useToast();

	// TODO: メンバー削除のロジック実装
	const handleDelete = async () => {
		onOpenChange(false);
		toast({
			title: "メンバーの削除",
			description: "メンバーの削除が完了しました",
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>メンバーの削除</DialogTitle>
					<DialogDescription>
						{member.name} ({member.email}) を組織から削除しますか？
						この操作は取り消せません。
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						キャンセル
					</Button>
					<Button variant="destructive" onClick={handleDelete}>
						削除
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

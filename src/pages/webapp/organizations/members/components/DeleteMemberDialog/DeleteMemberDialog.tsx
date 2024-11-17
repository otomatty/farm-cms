import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
	member: {
		name: string;
		email: string;
	};
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const DeleteMemberDialog = ({ member, open, onOpenChange }: Props) => {
	// TODO: メンバー削除のロジック実装
	const handleDelete = async () => {
		console.log("delete member");
		onOpenChange(false);
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

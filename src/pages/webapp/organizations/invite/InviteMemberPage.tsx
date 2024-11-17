import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

// TODO: types/invite.tsで型定義
// TODO: hooks/useInviteMembers.tsで招待管理のカスタムフック実装
// TODO: services/inviteService.tsでAPIリクエスト処理実装

const InviteMemberPage = () => {
	return (
		<div className="container mx-auto py-6">
			<h1 className="text-2xl font-bold mb-6">メンバー招待</h1>

			<form className="max-w-md space-y-4">
				<div>
					<label>メールアドレス</label>
					<Input type="email" placeholder="招待するメールアドレス" />
				</div>

				<div>
					<label>権限</label>
					<Select>
						<option value="member">メンバー</option>
						<option value="admin">管理者</option>
					</Select>
				</div>

				<div className="flex justify-between">
					<Button variant="outline" onClick={() => navigate("../members")}>
						キャンセル
					</Button>
					<Button type="submit">招待を送信</Button>
				</div>
			</form>
		</div>
	);
};

export default InviteMemberPage;

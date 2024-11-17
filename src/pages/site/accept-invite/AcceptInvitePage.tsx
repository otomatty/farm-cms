import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// TODO: types/invite.tsで型定義
// TODO: hooks/useAcceptInvite.tsで招待受諾のカスタムフック実装
// TODO: services/inviteService.tsでAPIリクエスト処理実装

const AcceptInvitePage = () => {
	// TODO: URLパラメータから招待トークン取得
	// TODO: 招待情報の検証
	// TODO: 招待受諾処理

	return (
		<div className="container mx-auto py-6">
			<Card className="max-w-md mx-auto p-6">
				<h1 className="text-2xl font-bold mb-4">組織への招待</h1>

				<div className="space-y-4">
					<div>
						<h2 className="font-semibold">組織名</h2>
						<p>{/* TODO: 組織名表示 */}</p>
					</div>

					<div>
						<h2 className="font-semibold">権限</h2>
						<p>{/* TODO: 付与される権限表示 */}</p>
					</div>

					<Button
						onClick={() => {
							/* TODO: 受諾処理 */
						}}
					>
						招待を受け入れる
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default AcceptInvitePage;

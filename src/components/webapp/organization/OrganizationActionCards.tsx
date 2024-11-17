import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

type OrganizationActionCardsProps = {
	createPath: string;
	joinPath: string;
};

export const OrganizationActionCards = ({
	createPath,
	joinPath,
}: OrganizationActionCardsProps) => {
	const navigate = useNavigate();

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>新しい組織を作成</CardTitle>
					<CardDescription>
						あなたの組織の新しいワークスペースを作成します。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => navigate(createPath)} className="w-full">
						組織を作成する
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>既存の組織に参加</CardTitle>
					<CardDescription>
						招待コードを使用して既存の組織に参加します。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => navigate(joinPath)} className="w-full">
						組織に参加する
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

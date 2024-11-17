import { InviteMemberButton } from "./InviteMemberButton";

export const PageHeader = () => {
	return (
		<div className="flex justify-between items-center">
			<div>
				<h1 className="text-2xl font-bold">メンバー管理</h1>
				<p className="text-muted-foreground">組織のメンバーを管理します</p>
			</div>
			<InviteMemberButton />
		</div>
	);
};

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useInvitations } from "./_hooks/useInvitations";
import { InvitationsTable } from "./_components/InvitationsTable";
import ResponsiveDialog from "@/components/common/ResponsiveDialog/ResponsiveDialog";
import { CreateInvitationForm } from "./_components/CreateInvitationForm";
import type { CreateInvitationParams } from "./_hooks/useInvitations";

export const InvitationsPage = () => {
	const {
		invitations,
		isLoading,
		createInvitation,
		resendInvitation,
		cancelInvitation,
	} = useInvitations();

	const handleCreateInvitation = async (values: CreateInvitationParams) => {
		await createInvitation.mutateAsync(values);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">招待管理</h1>
					<p className="text-sm text-muted-foreground">
						組織への招待を管理します
					</p>
				</div>
				<ResponsiveDialog
					trigger={
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							新規招待
						</Button>
					}
					title="新規招待"
					description="組織に新しいメンバーを招待します"
				>
					<CreateInvitationForm
						onSubmit={handleCreateInvitation}
						onClose={() => {}}
					/>
				</ResponsiveDialog>
			</div>

			<InvitationsTable
				data={invitations}
				isLoading={isLoading}
				onResendInvitation={resendInvitation.mutate}
				onCancelInvitation={cancelInvitation.mutate}
			/>
		</div>
	);
};

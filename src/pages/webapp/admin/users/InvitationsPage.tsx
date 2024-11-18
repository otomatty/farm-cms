import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./_components/invitation-columns";
import { useInvitations } from "./_hooks/useInvitations";
import { CreateInvitationDialog } from "./_components/CreateInvitationDialog";
import { useState } from "react";

export const InvitationsPage = () => {
	const { invitations, isLoading } = useInvitations();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="招待管理"
				description="組織への招待を管理します"
				action={
					<Button onClick={() => setIsDialogOpen(true)}>
						<Plus className="mr-2 h-4 w-4" />
						新規招待
					</Button>
				}
			/>
			<DataTable columns={columns} data={invitations} isLoading={isLoading} />
			<CreateInvitationDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>
		</div>
	);
};

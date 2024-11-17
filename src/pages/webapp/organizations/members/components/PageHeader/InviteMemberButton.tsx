import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

export const InviteMemberButton = () => {
	const navigate = useNavigate();

	return (
		<Button
			onClick={() => navigate("../invite")}
			className="flex items-center gap-2"
		>
			<PlusIcon className="h-4 w-4" />
			新規メンバー招待
		</Button>
	);
};

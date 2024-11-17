import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MembersTable } from "./_components/MembersTable/MembersTable";
import { columns } from "./_components/MembersTable/columns";
import { useOrganizationMembers } from "./_hooks/useOrganizationMembers";
import { useOrganization } from "@/hooks/useOrganization";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

const OrganizationMembersPage = () => {
	const { organizationId } = useParams<{ organizationId: string }>();
	const navigate = useNavigate();
	const { toast } = useToast();
	const {
		members,
		isLoading: membersLoading,
		error,
	} = useOrganizationMembers();
	const { canManageMembers } = useOrganization();
	const [hasManagePermission, setHasManagePermission] = useState(false);
	const [permissionLoading, setPermissionLoading] = useState(true);

	useEffect(() => {
		const checkPermission = async () => {
			if (organizationId) {
				try {
					const canManage = await canManageMembers(organizationId);
					setHasManagePermission(canManage);

					if (!canManage) {
						toast({
							variant: "destructive",
							title: "アクセス権限がありません",
							description: "このページを表示する権限がありません。",
						});
						navigate("webapp/organizations");
					}
				} catch (err) {
					toast({
						variant: "destructive",
						title: "エラーが発生しました",
						description: "権限の確認中にエラーが発生しました。",
					});
				} finally {
					setPermissionLoading(false);
				}
			}
		};
		checkPermission();
	}, [organizationId, canManageMembers, toast, navigate]);

	useEffect(() => {
		if (error) {
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: error.message || "メンバー情報の取得に失敗しました。",
			});
		}
	}, [error, toast]);

	if (membersLoading || permissionLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return null;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">メンバー一覧</h1>
			<MembersTable
				data={members}
				columns={columns}
				canManageMembers={hasManagePermission}
			/>
		</div>
	);
};

export default OrganizationMembersPage;

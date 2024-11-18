import { useAtom } from "jotai";
import { useCallback } from "react";
import {
	currentOrganizationAtom,
	organizationsAtom,
} from "@/stores/organizationAtom";
import { useOrganization } from "@/hooks/useOrganization";
import { useToast } from "@/hooks/use-toast";
import type { UserOrganizationWithDetails } from "@/types/organization";

// 組織の切り替え
export const useOrganizationSwitcher = () => {
	const { toast } = useToast();
	const [currentOrganization, setCurrentOrganization] = useAtom(
		currentOrganizationAtom,
	);
	const [organizations, setOrganizations] = useAtom(organizationsAtom);
	const { getOrganizations } = useOrganization();

	const loadOrganizations = useCallback(async () => {
		try {
			const orgs = await getOrganizations();
			setOrganizations(orgs);

			if (orgs.length > 0 && !currentOrganization) {
				setCurrentOrganization(orgs[0]);
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "組織の読み込みに失敗しました",
				description: "組織の読み込みに失敗しました",
			});
			setOrganizations([]);
		}
	}, [
		getOrganizations,
		setOrganizations,
		currentOrganization,
		setCurrentOrganization,
		toast,
	]);

	const switchOrganization = useCallback(
		(organization: UserOrganizationWithDetails) => {
			try {
				setCurrentOrganization(organization);
				console.log("組織が変更されました", organization);
				toast({
					title: "組織が変更されました",
					description: `現在の組織は「${organization.name}」です。`,
				});
			} catch (error) {
				console.error("組織の切り替えに失敗しました", error);
				toast({
					variant: "destructive",
					title: "組織の切り替えに失敗しました",
					description: "もう一度お試しください。",
				});
			}
		},
		[setCurrentOrganization, toast],
	);

	return {
		currentOrganization,
		organizations,
		loadOrganizations,
		switchOrganization,
	};
};

import { useAtom } from "jotai";
import { useCallback } from "react";
import {
	currentOrganizationAtom,
	organizationsAtom,
} from "@/stores/organizationAtom";
import { useOrganization } from "@/hooks/useOrganization";
import type { UserOrganizationWithDetails } from "@/types/organization";

// 組織の切り替え
export const useOrganizationSwitcher = () => {
	const [currentOrganization, setCurrentOrganization] = useAtom(
		currentOrganizationAtom,
	);
	const [organizations, setOrganizations] = useAtom(organizationsAtom);
	const { getOrganizations } = useOrganization();

	const loadOrganizations = useCallback(async () => {
		try {
			const orgs = await getOrganizations();
			setOrganizations(orgs);
			// 初回ロード時に組織が未設定の場合、最初の組織を選択
			if (!currentOrganization && orgs.length > 0) {
				setCurrentOrganization(orgs[0]);
			}
		} catch (error) {
			console.error("組織の読み込みに失敗しました", error);
		}
	}, [
		getOrganizations,
		setOrganizations,
		currentOrganization,
		setCurrentOrganization,
	]);

	const switchOrganization = useCallback(
		(organization: UserOrganizationWithDetails) => {
			setCurrentOrganization(organization);
		},
		[setCurrentOrganization],
	);

	return {
		currentOrganization,
		organizations,
		loadOrganizations,
		switchOrganization,
	};
};

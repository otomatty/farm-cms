import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
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

	// 初回マウント時に組織情報を読み込む
	useEffect(() => {
		loadOrganizations();
	}, []);

	const loadOrganizations = useCallback(async () => {
		try {
			const orgs = await getOrganizations();
			setOrganizations(orgs);

			// 現在の組織が存在しない、または組織リストに含まれていない場合のみ更新
			if (
				orgs.length > 0 &&
				(!currentOrganization ||
					!orgs.find((org) => org.id === currentOrganization.id))
			) {
				setCurrentOrganization(orgs[0]);
			}
		} catch (error) {
			console.error("Failed to load organizations:", error);
			toast({
				variant: "destructive",
				title: "組織の読み込みに失敗しました",
				description: "ネットワーク接続を確認してください",
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
		async (organization: UserOrganizationWithDetails) => {
			try {
				setCurrentOrganization(organization);

				// LocalStorageに保存して、ページリロード時も維持
				localStorage.setItem("lastOrganizationId", organization.id);

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

// 利便性のために追加するラッパーフック
export const useCurrentOrganization = () => {
	const { currentOrganization } = useOrganizationSwitcher();
	return { organization: currentOrganization };
};

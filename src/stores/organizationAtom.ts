import { atom } from "jotai";
import type { UserOrganizationWithDetails } from "@/types/organization";

export const currentOrganizationAtom = atom<UserOrganizationWithDetails | null>(
	null,
);
export const organizationsAtom = atom<UserOrganizationWithDetails[]>([]);

// 現在の組織のロールを取得するselector
export const currentOrganizationRoleAtom = atom((get) => {
	const currentOrg = get(currentOrganizationAtom);
	return currentOrg?.role ?? null;
});

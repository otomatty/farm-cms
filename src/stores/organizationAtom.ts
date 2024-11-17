import { atom } from "jotai";
import type { UserOrganizationWithDetails } from "@/types/organization";

export const currentOrganizationAtom = atom<UserOrganizationWithDetails | null>(
	null,
);
export const organizationsAtom = atom<UserOrganizationWithDetails[]>([]);

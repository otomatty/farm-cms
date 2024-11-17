import { atom } from "jotai";
import type { User, Session } from "@supabase/supabase-js";

// 初期状態をローカルストレージから復元
const getInitialUser = (): User | null => {
	try {
		const storedUser = localStorage.getItem("sb-user");
		return storedUser ? JSON.parse(storedUser) : null;
	} catch {
		return null;
	}
};

export const userAtom = atom<User | null>(getInitialUser());
export const sessionAtom = atom<Session | null>(null);
export const authLoadingAtom = atom(true);

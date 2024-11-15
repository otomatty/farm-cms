import { atom } from "jotai";
import type { User, Session } from "@supabase/supabase-js";

export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const authLoadingAtom = atom(true);

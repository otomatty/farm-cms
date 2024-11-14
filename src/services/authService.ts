import type {
	AuthError,
	AuthResponse,
	User,
	Session,
	OAuthResponse,
} from "@supabase/supabase-js";
import supabase from "@/lib/supabase";

export type SignInParams = {
	email: string;
	password: string;
};

export type SignUpParams = {
	email: string;
	password: string;
	options?: {
		data?: {
			name?: string;
		};
	};
};

export type ProfileData = {
	name?: string;
	avatar_url?: string;
	bio?: string;
	website?: string;
	company?: string;
	location?: string;
	[key: string]: string | undefined;
};

export const getCurrentSession = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
};

export const signUp = async ({
	email,
	password,
	options,
}: SignUpParams): Promise<AuthResponse> => {
	return await supabase.auth.signUp({
		email,
		password,
		options: options,
	});
};

export const signIn = async ({
	email,
	password,
}: SignInParams): Promise<AuthResponse> => {
	return await supabase.auth.signInWithPassword({
		email,
		password,
	});
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
	return await supabase.auth.signOut();
};

export const resetPassword = async (
	email: string,
): Promise<{ error: AuthError | null }> => {
	return await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`,
	});
};

export const updatePassword = async (
	newPassword: string,
): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
	return await supabase.auth.updateUser({
		password: newPassword,
	});
};

export const updateProfile = async (
	userData: ProfileData,
): Promise<{ data: { user: User | null }; error: AuthError | null }> => {
	const {
		data: { user },
		error,
	} = await supabase.auth.updateUser({
		data: userData,
	});

	return { data: { user }, error };
};

export const signInWithGoogle = async (): Promise<OAuthResponse> => {
	return await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		},
	});
};

export const handleAuthCallback = async (): Promise<{
	data: { session: Session | null };
	error: AuthError | null;
}> => {
	const { data, error } = await supabase.auth.getSession();
	return { data, error };
};
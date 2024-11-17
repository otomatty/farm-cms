export interface DbUserProfile {
	user_id: string;
	full_name: string;
	email: string;
	phone_number: string | null;
	profile_image: string | null;
	bio: string | null;
	created_at: string;
	updated_at: string;
}

export interface DbUserProfileInsert {
	user_id: string;
	full_name: string;
	email: string;
	phone_number?: string;
	profile_image?: string;
	bio?: string;
}

export interface UserProfile {
	userId: string;
	fullName: string;
	email: string;
	phoneNumber?: string;
	profileImage?: string;
	bio?: string;
	createdAt: string;
	updatedAt: string;
}

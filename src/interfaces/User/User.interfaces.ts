export interface IUser {
	about?: string
	city?: string
	dob?: string
	email?: string
	first_name?: string
	first_sign_up?: boolean
	follower_count: number
	following_count: number
	has_private_likes?: boolean
	id?: number
	last_name?: string
	location?: string
	phone_number?: string
	picture?: string
	public?: boolean
	sex?: string
	social?: ISocial[]
	username?: string
	middle_name?: string
	followed?: boolean
	follower?: boolean
}

interface ISocial {
	id?: number
	network?: string
	url?: string
}

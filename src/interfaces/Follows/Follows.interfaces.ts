export interface IFollowersResp {
	count: number
	next: null | string
	previous: null | string
	results: IFollowersResultItem[] | []
}

export interface IFollowersResultItem {
	from_user: IFollowResultItemUser
	active: boolean
	created: string
	modified: string
	to_user: number
	follower: boolean
	followed: boolean
}

export interface IFollowedResp {
	count: number
	next: null | string
	previous: null | string
	results: IFollowedResultItem[] | []
}

export interface IFollowedResultItem {
	from_user: number
	active: boolean
	created: string
	modified: string
	follower: boolean
	followed: boolean
	to_user: IFollowResultItemUser
}

export interface IFollowResultItemUser {
	id: number
	username: string
	first_name: string
	middle_name: string
	last_name: string
	picture: string
	about: string
	social: ISocial[]
	follower_count: number
	following_count: number
	has_private_likes: boolean
	followed: boolean
	follower: boolean
}

export interface ISocial {
	id?: number
	network?: string
	url?: string
}

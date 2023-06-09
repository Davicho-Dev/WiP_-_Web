import { useState } from 'react'

import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { hdlErrors } from '../../../../helpers'
import { apiPrivate } from '../../../../utils'
import { Avatar, ButtonSolid } from '../../../atoms'
import { IUserCardProps } from './UserCard.interfaces'

import DummyImg from '../../../../assets/img/img_no_avatar.png'

export const UserCard = ({
	followed,
	follower,
	id,
	picture,
	username,
}: IUserCardProps): JSX.Element => {
	const [isFollowed, setIsFollowed] = useState<boolean>(followed)
	const [onLoading, setOnLoading] = useState<boolean>(false)
	const [followSuccess, setFollowSuccess] = useState<boolean>(false)

	const navigate = useNavigate()

	const followUser = async (id: number, followed: boolean) => {
		setOnLoading(true)

		try {
			await apiPrivate.patch(`users/${id}/follows/`, {
				active: !followed,
			})

			setIsFollowed(!followed)
			setFollowSuccess(true)
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)

			setTimeout(() => {
				setFollowSuccess(false)
			}, 1000)
		}
	}

	return (
		<article
			key={id}
			className='flex justify-between gap-x-2 md:!gap-x-4 max-w-full overflow-hidden'
		>
			<Avatar
				className='w-11 h-11 shrink-0 cursor-pointer'
				src={picture ?? DummyImg}
				onClick={() => navigate(`/user/${username}`)}
			/>
			<article className='min-w-[46%] max-w-[54%] md:!max-w-full inline-flex flex-col justify-center grow shrink text-lefts'>
				<h1
					className='w-full text-sm line-clamp-1 text-ellipsis break-words overflow-hidden cursor-pointer'
					onClick={() => navigate(`/user/${username}`)}
				>
					{`@${username}`}
				</h1>
				<h5 className='w-full text-xs line-clamp-1 text-ellipsis break-words overflow-hidden'>
					{follower ? 'Follows you' : null}
				</h5>
			</article>
			<ButtonSolid
				label={isFollowed ? 'Following_' : 'Follow_'}
				onLoading={onLoading}
				onSuccess={followSuccess}
				disabled={onLoading}
				onClick={() => followUser(id, isFollowed)}
				className={`w-fit px-5 border border-neutral-800 bg-transparent text-sm md:text-base ${
					isFollowed ? '!bg-primary text-white' : ''
				}`}
			/>
		</article>
	)
}

import { useState } from 'react'

import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { PATTERN_PASSWORD } from '../../../../constants'
import { hdlErrors } from '../../../../helpers'
import { apiPrivate } from '../../../../utils'
import { ButtonSolid, FormInputPassword } from '../../../atoms'
import { toast } from 'react-toastify'

interface IFormProps {
	password: string
	new_password: string
	new_password_verification: string
}

interface IPasswordFormProps {
	email?: string
	id?: number
}

export const PasswordForm = ({
	email,
	id,
}: IPasswordFormProps): JSX.Element => {
	const [onLoading, setOnLoading] = useState<boolean>(false)

	const {
		handleSubmit,
		formState: { errors },
		getValues,
		register,
		reset,
	} = useForm<IFormProps>()

	const onSubmit: SubmitHandler<IFormProps> = async formData => {
		setOnLoading(true)
		const { new_password, password } = formData

		console.log(formData)

		try {
			await apiPrivate.post(`/users/${id}/change_password/`, {
				email,
				password,
				new_password,
			})

			toast.success('Password changed successfully')

			reset()
		} catch (err) {
			hdlErrors(err as AxiosError)
		} finally {
			setOnLoading(false)
		}
	}

	return (
		<form
			className='flex flex-col gap-y-4 md:!gap-y-8 lg:!gap-y-12 py-4 md:!py-6 lg:!py-10 px-3 md:!px-6 lg:px-0'
			onSubmit={handleSubmit(onSubmit)}
		>
			<section className='bg-[#f9fbf1] rounded-[20px] overflow-hidden border-neutral-800 border-2'>
				<header className='w-full p-4 bg-neutral-800'>
					<h1 className='text-white'>Password</h1>
					<span className='text-sm text-white'>Your passwords for login</span>
				</header>
				<section className='grid gap-y-6 p-8'>
					<FormInputPassword
						placeholder='Current password'
						onError={errors.password ? true : false}
						errorDescription={errors.password?.message}
						register={{
							...register('password', {
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									value: PATTERN_PASSWORD,
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
								},
							}),
						}}
					/>
					<FormInputPassword
						placeholder='New password'
						onError={errors.new_password ? true : false}
						errorDescription={errors.new_password?.message}
						register={{
							...register('new_password', {
								validate: value =>
									value !== getValues('new_password_verification') &&
									getValues('new_password_verification') !== ''
										? 'The passwords do not match'
										: undefined,
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									value: PATTERN_PASSWORD,
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
								},
							}),
						}}
					/>
					<FormInputPassword
						placeholder='Confirm new password'
						onError={errors.new_password_verification ? true : false}
						errorDescription={errors.new_password_verification?.message}
						register={{
							...register('new_password_verification', {
								validate: value =>
									value !== getValues('new_password') &&
									getValues('new_password') !== ''
										? 'The passwords do not match'
										: undefined,
								required: { value: true, message: 'This field is required' },
								minLength: {
									value: 12,
									message: 'Password must be at least 12 characters',
								},
								pattern: {
									value: PATTERN_PASSWORD,
									message:
										'Password must contain at least one number and symbol and one uppercase and lowercase letter',
								},
							}),
						}}
					/>
					<NavLink className='justify-self-center text-primary' to=''>
						I forgot my password
					</NavLink>
				</section>
			</section>
			<ButtonSolid
				label='Save'
				disabled={onLoading}
				className='w-48 bg-primary text-white self-end'
			/>
		</form>
	)
}

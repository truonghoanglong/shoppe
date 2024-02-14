import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '~/components/Input'
import { schema, Schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosErrorUnprocessableEntityError } from '~/utils/utils'
import { ResponseApi } from '~/types/utils.type'
import { toast } from 'react-toastify'

type FormData = Schema

export default function Register() {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm<Schema>({
        resolver: yupResolver(schema)
    })

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password'])
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                if (isAxiosErrorUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data

                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, 'confirm_password'>, {
                                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                                type: 'Server'
                            })
                        })
                    }

                    // if (formError?.email) {
                    //     setError('email', {
                    //         message: formError.email,
                    //         type: 'Server'
                    //     })
                    // }
                    // if (formError?.password) {
                    //     setError('password', {
                    //         message: formError.password,
                    //         type: 'Server'
                    //     })
                    // }
                }
            }
        })
    })

    return (
        <div className='bg-orange'>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                            <div className='text-2xl'>Đăng Ký</div>

                            <Input
                                type='email'
                                errorMessage={errors.email?.message}
                                register={register}
                                className='mt-8'
                                name='email'
                                placeholder='Email'
                            />

                            <Input
                                type='password'
                                errorMessage={errors.password?.message}
                                register={register}
                                className='mt-5'
                                name='password'
                                placeholder='Password'
                                autoComplete='on'
                            />

                            <Input
                                type='password'
                                errorMessage={errors.confirm_password?.message}
                                register={register}
                                className='mt-5'
                                name='confirm_password'
                                placeholder='Confirm Password'
                                autoComplete='on'
                            />

                            <div className='mt-7'>
                                <button
                                    type='submit'
                                    className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white hover:bg-red-600'
                                >
                                    Đăng Ký
                                </button>
                            </div>

                            <div className='mt-4 text-center'>
                                <div className='flex justify-center items-center mt-8'>
                                    <span className='text-gray  -400'>Bạn có tài khoản chưa ? </span>
                                    <Link to='/login' className='text-red-400 ml-2'>
                                        Đăng Nhập
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

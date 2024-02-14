import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from '~/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '~/apis/auth.api'
import { isAxiosErrorUnprocessableEntityError } from '~/utils/utils'
import { ResponseApi } from '~/types/utils.type'
import Input from '~/components/Input'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema)
    })

    const loginAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)

        loginAccountMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                if (isAxiosErrorUnprocessableEntityError<ResponseApi<FormData>>(error)) {
                    const formError = error.response?.data.data

                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
                                type: 'Server'
                            })
                        })
                    }
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
                            <div className='text-2xl'>Đăng Nhập</div>
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

                            <div className='mt-7'>
                                <button
                                    type='submit'
                                    className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white hover:bg-red-600'
                                >
                                    Đăng Nhập
                                </button>
                            </div>

                            <div className='mt-4 text-center'>
                                <div className='flex justify-center items-center mt-8'>
                                    <span className='text-gray  -400'>Bạn chưa có tài khoản ? </span>
                                    <Link to='/register' className='text-red-400 ml-2'>
                                        Đăng Ký
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

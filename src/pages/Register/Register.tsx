import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '~/components/Input'
import { getRules } from '~/utils/rules'

interface FormData {
    email: string
    password: string
    confirm_password: string
}

export default function Register() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit = handleSubmit(
        (data) => {
            // console.log(data)
        },
        (data) => {
            const password = getValues('password')
            console.log(password)
        }
    )

    // console.log('error', errors)

    const rules = getRules(getValues)

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
                                rules={rules.email}
                            />

                            <Input
                                type='password'
                                errorMessage={errors.password?.message}
                                register={register}
                                className='mt-5'
                                name='password'
                                placeholder='Password'
                                rules={rules.password}
                                autoComplete='on'
                            />

                            <Input
                                type='password'
                                errorMessage={errors.confirm_password?.message}
                                register={register}
                                className='mt-5'
                                name='confirm_password'
                                placeholder='Confirm Password'
                                rules={rules.confirm_password}
                                autoComplete='on'
                            />

                            {/* <div className='mt-5'>
                                <input
                                    type='password'
                                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                                    placeholder='Confirm Password'
                                    autoComplete='on'
                                    {...register('confirm_password', {
                                        ...rules.confirm_password
                                    })}
                                />
                                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
                                    {errors.confirm_password?.message}
                                </div>
                            </div> */}

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

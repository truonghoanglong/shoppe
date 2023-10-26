import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    console.log('error', errors)

    return (
        <div className='bg-orange'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                            <div className='text-2xl'>Đăng Ký</div>
                            <div className='mt-8'>
                                <input
                                    type='email'
                                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                                    placeholder='Email'
                                    {...register('email', {
                                        required: true
                                    })}
                                />
                                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
                            </div>
                            <div className='mt-5'>
                                <input
                                    type='password'
                                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                                    placeholder='Password'
                                    {...register('password')}
                                />
                                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
                            </div>

                            <div className='mt-5'>
                                <input
                                    type='password'
                                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                                    placeholder='Confirm Password'
                                    {...register('confirm_password')}
                                />
                                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
                            </div>

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

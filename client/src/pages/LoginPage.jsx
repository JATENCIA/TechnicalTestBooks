import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContex'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signin, authError, isAuthenticating } = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticating) navigate('/')
  }, [isAuthenticating])

  const onSubmite = handleSubmit(async (data) => {
    await signin(data)
  })
  return (
    <div className='flex justify-center items-center pt-14'>
      <div className='shadow-2xl max-w-md p-10 rounded-md'>
        {authError.map((error, index) => (
          <p className='text-red-500' key={index}>
            {error}
          </p>
        ))}
        <h1 className='text-2xl font-bold text-white'>Login</h1>
        <form onSubmit={onSubmite} className='flex flex-col gap-y-2'>
          <input
            type='email'
            {...register('email', { required: true })}
            placeholder='Email'
            className=' border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <input
            type='password'
            {...register('password', { required: true })}
            placeholder='Password'
            className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <button
            className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white uppercase hover:bg-gray-500'
            type='submite'>
            sing in
          </button>
        </form>
        <p className='flex justify-center gap-x-2 mt-4 uppercase'>
          <span className='text-sm'>Dont have an account?</span>{' '}
          <Link to='/register' className='text-sky-500'>
            <span className='text-sm border-2 border-sky-500 p-1 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer '>
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

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
    if (isAuthenticating) navigate('/books')
  }, [isAuthenticating])

  const onSubmite = handleSubmit(async (data) => {
    await signin(data)
  })
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
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
            className='w-full bg-zinc-700 text-white px-4 rounded-md'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <input
            type='password'
            {...register('password', { required: true })}
            placeholder='Password'
            className='w-full bg-zinc-700 text-white px-4 rounded-md'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}
          <button type='submite'>Login</button>
        </form>
        <p className='flex justify-center gap-x-2 '>
          Dont have an account?{' '}
          <Link to='/register' className='text-sky-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

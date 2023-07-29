import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContex'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signup, isAtheticating, authError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAtheticating) navigate('/')
  }, [isAtheticating])

  const onSubmite = handleSubmit(async (values) => {
    await signup(values)
  })

  return (
    <div className='flex justify-center items-center pt-14 '>
      <div className='shadow-2xl max-w-md p-10 rounded-md'>
        {authError.map((error, index) => (
          <p className='text-red-500' key={index}>
            {error}
          </p>
        ))}
        <form onSubmit={onSubmite} className='flex flex-col gap-y-2'>
          <input
            type='text'
            {...register('username', { required: true })}
            placeholder='Username'
            className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white'
          />
          {errors.username && (
            <p className='text-red-500'>Username is required</p>
          )}
          <input
            type='email'
            {...register('email', { required: true })}
            placeholder='Email'
            className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white'
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
            Sign Up
          </button>
        </form>
        <p className='flex justify-center gap-x-2 mt-4'>
          <span className='text-sm'>Already have an account?</span>
          <Link to='/login' className='text-sky-500'>
            <span className='text-sm border-2 border-sky-500 p-1 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer '>
              sing in
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage

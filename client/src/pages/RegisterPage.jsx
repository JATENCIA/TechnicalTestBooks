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
    if (isAtheticating) navigate('/books')
  }, [isAtheticating])

  const onSubmite = handleSubmit(async (values) => {
    await signup(values)
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
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
          className='w-full bg-zinc-700 text-white px-4 rounded-md'
        />
        {errors.username && (
          <p className='text-red-500'>Username is required</p>
        )}
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
        <button type='submite'>Register</button>
      </form>
      <p className='flex justify-center gap-x-2 '>
        Already have an account?{' '}
        <Link to='/login' className='text-sky-500'>
          Login
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage

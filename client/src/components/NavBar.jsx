import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'

const NavBar = () => {
  const { isAuthenticating, logout, user } = useAuth()
  return (
    <nav className='bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>BOOKS</h1>
      </Link>
      <ul className='flex gap-x-2'>
        {!isAuthenticating ? (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>welcome {user.username}</li>
            <li>
              <Link to='/profile'>My profile</Link>
            </li>
            <li>
              <Link to='/' onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar

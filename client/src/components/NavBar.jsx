import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'

const NavBar = () => {
  const { isAuthenticating, logout, user } = useAuth()
  return (
    <nav className=' border-b-2 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to='/'>
        <h1 className='text-4xl font-black bg-gradient-to-r from-cyan-300 via-cyan-600 to-cyan-900 bg-clip-text text-transparent rounded-md hover:text-[50px]  w-50 mx-auto flex justify-center font-Fraunces'>
          BOOKS
        </h1>
      </Link>
      <ul className='flex gap-x-4 font-Barlow text-2xl uppercase'>
        {!isAuthenticating ? (
          <>
            <li className='  flex items-center justify-center  hover:text-blue-300 transition font-Fraunces font-bold'>
              <Link to='/login'>sing in</Link>
            </li>
            <li className='text-blue-500 bg-blue-100 flex items-center justify-center border rounded-lg hover:bg-blue-300 transition w-[180px]'>
              <Link to='/register'>sing up</Link>
            </li>
          </>
        ) : (
          <>
            <li className='flex items-center justify-center text-zinc-300 transition font-Barlow font-bold '>
              {user.username}
            </li>
            <li className='flex items-center justify-center  hover:text-green-300 transition font-Fraunces font-bold'>
              <Link to='/profile'>My profile</Link>
            </li>
            <li className='text-red-500  flex items-center font-bold hover:text-red-700 transition'>
              <Link to='/' onClick={logout}>
                Logo ut
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar

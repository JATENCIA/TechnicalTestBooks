import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'
import Cookie from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState([])
  const [loading, setLoading] = useState(true)

  const signup = async (user) => {
    try {
      const result = await registerRequest(user)
      setUser(result.data)
      setIsAuthenticating(true)
    } catch (error) {
      setAuthError(error.response.data)
    }
  }

  const signin = async (user) => {
    try {
      const result = await loginRequest(user)
      setUser(result.data)
      setIsAuthenticating(true)
    } catch (error) {
      setAuthError(error.response.data)
    }
  }

  const logout = () => {
    Cookie.remove('token')
    setUser(null)
    setIsAuthenticating(false)
  }

  useEffect(() => {
    if (authError.length > 0) {
      const timer = setTimeout(() => {
        setAuthError([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [authError])

  useEffect(() => {
    async function checkLogin() {
      const token = Cookie.get('token')
      if (!token) {
        setIsAuthenticating(false)
        setLoading(false)
        return setUser(null)
      }

      if (token) {
        try {
          const result = await verityTokenRequest(token)
          if (!result.data) {
            setIsAuthenticating(false)
            setLoading(false)
            return
          }
          setUser(result.data)
          setIsAuthenticating(true)
          setLoading(false)
        } catch (error) {
          setIsAuthenticating(false)
          setUser(null)
          setLoading(false)
        }
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticating,
        authError,
        loading,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

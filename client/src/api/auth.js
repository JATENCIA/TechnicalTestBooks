import axios from './axios'

export const registerRequest = (user) => axios.post('auth/register', user)

export const loginRequest = (user) => axios.post('auth/login', user)

export const logoutRequest = () => axios.get('auth/logout')

export const verityTokenRequest = () => axios.get('auth/verify-token')

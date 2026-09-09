import { useSelector } from 'react-redux'
import type { RootState } from '@/store/authStore'

export const useAuth = () => {
  const {
    user,
    token,
    role,
    authInitialized,
  } = useSelector(
    (state: RootState) => state.auth
  )

  return {
    user,
    token,
    role,
    authInitialized,

    isLoggedIn: !!user && !!token,
    isAdmin: role === 'admin',
    isUser: role === 'user',
  }
}
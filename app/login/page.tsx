'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import LoginComp from '@/components/LoginComp'
import { loginUser } from '@/hooks/authThunk'
import { useAuth } from '@/hooks/useAuth'
import type { AppDispatch, RootState } from '@/store/authStore'
import type { LoginFormData } from '@/types'

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { loading, error } = useSelector((state: RootState) => state.auth)
  const { isLoggedIn, role } = useAuth()

  // 🔑 Handle form submit
  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await dispatch(
        loginUser({
          username: data.username,
          password: data.password,
        })
      ).unwrap()

      if (typeof window !== "undefined") {
      // ✅ Save token to localStorage
      localStorage.setItem('token', result.accessToken)
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  // 🔑 Redirect after login
  useEffect(() => {
    if (!isLoggedIn) return

    if (role === 'admin') {
      router.replace('/admin-dashboard')
    } else if (role === 'user') {
      router.replace('/user-dashboard')
    }
  }, [isLoggedIn, role, router])

  return (
    <LoginComp
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  )
}

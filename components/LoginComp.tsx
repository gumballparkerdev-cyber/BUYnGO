'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { loginSchema, type LoginFormData } from '@/types'

export default function LoginComp({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (data: LoginFormData) => void
  loading?: boolean
  error?: string | null
}) {
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  mode: 'onChange', // 👈 validates as you type
})

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-amber-50 to-pink-100"
    >
      <motion.form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
        })}
        className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-lg w-96"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Welcome Back 👋
        </h2>

        <input
          type="text"
          placeholder="Username"
          {...register('username')}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}

     <input
        type="password"
        placeholder="Password"
        {...register('password')}
  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
/>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Login'}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

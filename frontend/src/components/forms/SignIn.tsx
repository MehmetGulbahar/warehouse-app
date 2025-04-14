'use client'

import { useState } from 'react'
import { FiMail, FiLock, FiX, FiCheckCircle } from 'react-icons/fi'

interface SignInProps {
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignIn({ onClose, onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5210/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.')
      }

      console.log('Login successful:', data)
      
      setIsSuccess(true)
      
      setTimeout(() => {
        onClose()
        window.location.href = '/'
      }, 1000)
    } catch (err) {
      console.error('Access error:', err)
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="overflow-hidden relative p-6 mx-4 w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 rounded-full transition-colors hover:text-gray-500 dark:hover:text-gray-300"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex flex-col justify-center items-center py-8 text-center">
          <div className="flex justify-center items-center mb-4 w-16 h-16 bg-green-100 rounded-full dark:bg-green-900/30">
            <FiCheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
          </div>
          
          <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            Login Successful!
          </h2>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            You are being directed to the home page.
          </p>
          
          <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden relative p-6 mx-4 w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 text-gray-400 rounded-full transition-colors hover:text-gray-500 dark:hover:text-gray-300"
      >
        <FiX className="w-5 h-5" />
      </button>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Sign In
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Log in to your account
        </p>
      </div>

      {error && (
        <div className="p-2 mb-4 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-200 dark:text-red-800">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiMail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2 pr-3 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="example@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiLock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2 pr-3 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Forgot password
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 text-sm font-medium text-white transition-colors rounded-md ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Processing...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Dont have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

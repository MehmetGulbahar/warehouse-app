'use client'

import { useState } from 'react'
import { FiUser, FiMail, FiLock, FiX, FiCheckCircle } from 'react-icons/fi'

interface SignUpProps {
  onClose: () => void
  onSwitchToSignIn: () => void
}

export default function SignUp({ onClose, onSwitchToSignIn }: SignUpProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:5210/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameSurname: name,
          email,
          password,
          passwordConfirm: confirmPassword
        }),
        credentials: 'include',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.')
      }
      
      console.log('Registration successful:', data)
      
      setIsSuccess(true)
      
      setTimeout(() => {
        onSwitchToSignIn()
      }, 3000)
    } catch (err) {
      console.error('Registration error:', err)
      setError(err instanceof Error ? err.message : 'Registration failed.')
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
            Registration Successful!
          </h2>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Please check your email address to verify your account.
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirecting to sign in...
          </p>
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
          Sign Up
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new account
        </p>
      </div>
      
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiUser className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2 pr-3 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Full Name"
              required
            />
          </div>
        </div>
        
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FiLock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block py-2 pr-3 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
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
          {isLoading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from '@/providers/ThemeProvider'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTranslation } from 'react-i18next'
import { FiSun, FiMoon, FiBell, FiLogIn, FiUser, FiLogOut, FiSettings, FiGlobe } from 'react-icons/fi'
import SignIn from '@/components/forms/SignIn'
import SignUp from '@/components/forms/SignUp'

interface UserData {
  id: string;
  email: string;
  nameSurname: string;
  initials: string;
}

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5210/api/auth/user-info', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const toggleAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5210/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      setUserData(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const getCurrentLanguageName = () => {
    switch (language) {
      case 'tr': return 'TR';
      case 'de': return 'DE';
      default: return 'EN';
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-0 w-full">
          <div className="flex justify-between pl-20 h-16">
            <div className="flex items-center pl-20">
              <Link href="/" className="flex items-center pl-0">
                <div className="flex justify-center items-center mr-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-2xl font-bold tracking-tight text-blue-500">
                  {t('common.appName')}
                </span>
              </Link>
            </div>

            <div className="flex items-center pr-4 ml-auto space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center p-2 text-gray-500 rounded-full transition-colors hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                  aria-label="Select language"
                >
                  <FiGlobe className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">{getCurrentLanguageName()}</span>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg dark:bg-gray-800" style={{ zIndex: 2 }}>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          changeLanguage('en'); 
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center px-4 py-2 w-full text-left text-sm ${language === 'en' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          changeLanguage('tr'); 
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center px-4 py-2 w-full text-left text-sm ${language === 'tr' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        Türkçe
                      </button>
                      <button
                        onClick={() => {
                          changeLanguage('de'); 
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center px-4 py-2 w-full text-left text-sm ${language === 'de' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        Deutsch
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              
              <button className="relative p-2 text-gray-500 rounded-full transition-colors hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700">
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Auth Buttons or User Avatar */}
              {userData ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="inline-flex justify-center items-center w-11 h-11 text-white bg-blue-500 rounded-full text-l hover:bg-indigo-600 focus:outline-none"
                    aria-label="User menu"
                  >
                    {userData.initials}
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg dark:bg-gray-800" style={{ zIndex: 1 }}>
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 dark:text-gray-200 dark:border-gray-700">
                          <p className="font-medium">{userData.nameSurname}</p>
                          <p className="text-xs text-gray-500 truncate dark:text-gray-400">{userData.email}</p>
                        </div>
                        <Link 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiUser className="mr-2 w-4 h-4" />
                          {t('settings.profile')}
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiSettings className="mr-2 w-4 h-4" />
                          {t('settings.title')}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiLogOut className="mr-2 w-4 h-4" />
                          {t('common.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAuth('signin')}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors rounded-md hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    <FiLogIn className="inline-block mr-1 w-4 h-4" />
                    {t('auth.login')}
                  </button>
                  <button
                    onClick={() => toggleAuth('signup')}
                    className="px-3 py-1.5 text-sm font-medium text-white transition-colors rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    {t('auth.register')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          {authMode === 'signin' ? (
            <SignIn 
              onClose={() => setIsAuthOpen(false)} 
              onSwitchToSignUp={() => setAuthMode('signup')} 
            />
          ) : (
            <SignUp 
              onClose={() => setIsAuthOpen(false)} 
              onSwitchToSignIn={() => setAuthMode('signin')} 
            />
          )}
        </div>
      )}
    </>
  )
}
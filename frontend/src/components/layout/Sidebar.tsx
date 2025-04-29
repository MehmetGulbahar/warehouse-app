'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaSignalSolid } from "react-icons/lia";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { PiArrowSquareOutBold, PiArrowSquareInBold } from "react-icons/pi";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  submenu?: NavItem[];
}

const navigation: NavItem[] = [
  { name: 'Home Page', href: '/', icon: <AiOutlineHome size={24} /> },
  { name: 'Inventory Management', href: '/inventory', icon: <GoPackage size={24} /> },
  { 
    name: 'Transactions', 
    href: '/transactions', 
    icon: <TbReportAnalytics size={24} />,
    submenu: [
      { name: 'All Transactions', href: '/transactions', icon: <RiArrowLeftRightLine size={20} /> },
      { name: 'Outgoing Stock', href: '/transactions/outgoing', icon: <PiArrowSquareOutBold size={20} /> },
      { name: 'Incoming Stock', href: '/transactions/incoming', icon: <PiArrowSquareInBold size={20} /> },
    ] 
  },
  { name: 'Reports', href: '/reports', icon: <LiaSignalSolid size={24} /> },
  { name: 'Suppliers', href: '/suppliers', icon: <FaArrowsDownToPeople size={24} /> },
  { name: 'Settings', href: '/settings', icon: <CiSettings size={24} /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  
  const toggleExpand = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedItem(prev => prev === name ? null : name)
  }

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out shadow-sm`}>
      <div className="h-full px-3 py-4">
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = item.href === pathname || 
              (item.submenu && item.submenu.some(subItem => subItem.href === pathname))
            const isExpanded = expandedItem === item.name
            
            return (
              <div key={item.name} className="flex flex-col">
                <div 
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white bg-gradient-to-r to-blue-600 shadow-sm from-primary'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Link 
                    href={item.href}
                    className="flex items-center flex-grow"
                  >
                    <span 
                      className={`${isCollapsed ? 'w-10 h-10' : 'w-10 h-10'} flex items-center justify-center ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                  {!isCollapsed && item.submenu && (
                    <button
                      onClick={(e) => toggleExpand(item.name, e)}
                      className="ml-auto focus:outline-none"
                      aria-label={isExpanded ? "Collapse submenu" : "Expand submenu"}
                    >
                      {isExpanded ? <IoIosArrowUp className={isActive ? "text-white" : ""} /> : <IoIosArrowDown className={isActive ? "text-white" : ""} />}
                    </button>
                  )}
                </div>
                
                {/* Submenu */}
                {!isCollapsed && item.submenu && isExpanded && (
                  <div className="mt-1 mb-1 ml-6 space-y-1">
                    {item.submenu.map(subItem => {
                      const isSubActive = pathname === subItem.href
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isSubActive
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
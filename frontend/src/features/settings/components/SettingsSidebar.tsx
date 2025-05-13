import React from "react";
import { FiUser, FiEye, FiBell, FiLock, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation();

  const tabs = [
    { id: "profile", label: t('settings.profile'), icon: FiUser },
    { id: "appearance", label: t('settings.appearance'), icon: FiEye },
    { id: "notifications", label: t('settings.notifications'), icon: FiBell },
    { id: "security", label: t('settings.security'), icon: FiLock },
    { id: "language", label: t('settings.language'), icon: FiGlobe },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 h-full">
      <div className="p-4">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:translate-x-1"
                }`}
              >
                <Icon className={`w-4 h-4 mr-2.5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className="font-medium truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
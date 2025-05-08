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
    <div className="w-full bg-white border-r border-gray-100 dark:bg-gray-800 dark:border-gray-700 md:w-64">
      <div className="p-4">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">{t('settings.title')}</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
import React from "react";
import { FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export const ProfileSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.profile')}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.profilePhoto')}</label>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full dark:bg-gray-700">
              <FiUser className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('settings.changePhoto')}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.nameSurname')}</label>
          <input
            type="text"
            className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder={t('settings.nameSurname')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.email')}</label>
          <input
            type="email"
            className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="example@email.com"
          />
        </div>
      </div>
    </div>
  );
};
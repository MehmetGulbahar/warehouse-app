import React from "react";
import { useTranslation } from "react-i18next";

interface SecuritySettingsProps {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  errorMessage: string;
  saveMessage: string;
  isSubmitting: boolean;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  passwordData,
  handlePasswordChange,
  handlePasswordSubmit,
  errorMessage,
  saveMessage,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.security')}</h3>
      
      {errorMessage && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-800/30 dark:text-red-400">
          {errorMessage}
        </div>
      )}
      
      {saveMessage && (
        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-800/30 dark:text-green-400">
          {saveMessage}
        </div>
      )}
      
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.currentPassword')}</label>
          <div className="relative mt-1">
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
              className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('settings.currentPassword')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.newPassword')}</label>
          <div className="relative mt-1">
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('settings.newPassword')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('auth.confirmPassword')}</label>
          <div className="relative mt-1">
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t('auth.confirmPassword')}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.save')}...
              </span>
            ) : (
              t('common.save')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
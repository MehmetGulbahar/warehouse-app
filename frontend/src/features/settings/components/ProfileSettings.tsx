import React, { useState } from "react";
import { FiUser, FiCamera, FiSave } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export const ProfileSettings: React.FC = () => {
  const { t } = useTranslation();
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = () => {
    setSaveMessage(t('settings.savedSuccessfully'));
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <header className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.profile')}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('settings.profileDescription', 'Update your profile information')}</p>
          </header>
          
          {saveMessage && (
            <div className="p-4 mb-6 text-sm font-medium text-green-700 bg-green-50 rounded-lg border border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              {saveMessage}
            </div>
          )}
          
          <div className="space-y-8">
            {/* Profile Photo Section */}
            <div className="relative">
              <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.profilePhoto')}</label>
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="flex overflow-hidden justify-center items-center w-28 h-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full dark:from-gray-700 dark:to-gray-600">
                    <FiUser className="w-14 h-14 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="flex absolute inset-0 justify-center items-center rounded-full opacity-0 transition-opacity bg-black/50 group-hover:opacity-100">
                    <FiCamera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <FiCamera className="mr-2 w-4 h-4" />
                    {t('settings.changePhoto')}
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">JPG, GIF or PNG. Max size of 2MB.</span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.nameSurname')}</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder={t('settings.nameSurname')}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.email')}</label>
                <input
                  type="email"
                  className="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.bio', 'Bio')}</label>
              <textarea
                rows={4}
                className="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t('settings.bioPlaceholder', 'Tell us about yourself...')}
              />
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-3 mt-6">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-8 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiSave className="mr-2 w-4 h-4" />
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
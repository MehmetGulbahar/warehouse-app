import React from "react";
import { useTranslation } from "react-i18next";

interface AppearanceSettingsProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  selectedFontSize: string;
  setSelectedFontSize: (fontSize: string) => void;
  saveMessage: string;
  saveAppearanceSettings: () => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  selectedTheme,
  setSelectedTheme,
  selectedFontSize,
  setSelectedFontSize,
  saveMessage,
  saveAppearanceSettings,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.appearance')}</h3>
      {saveMessage && (
        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-800/30 dark:text-green-400">
          {saveMessage}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.theme')}</label>
          <select 
            className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option>{t('settings.lightTheme')}</option>
            <option>{t('settings.darkTheme')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.fontSize')}</label>
          <select 
            className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            value={selectedFontSize}
            onChange={(e) => setSelectedFontSize(e.target.value)}
          >
            <option>{t('settings.small')}</option>
            <option>{t('settings.medium')}</option>
            <option>{t('settings.large')}</option>
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={saveAppearanceSettings}
            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};
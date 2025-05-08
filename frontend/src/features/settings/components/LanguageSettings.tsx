import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";

interface LanguageSettingsProps {
  saveMessage: string;
}

export const LanguageSettings: React.FC<LanguageSettingsProps> = ({
  saveMessage,
}) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const getDisplayLanguage = () => {
    switch (language) {
      case 'tr': return "Türkçe";
      case 'de': return "Deutsch";
      default: return "English";
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const langCode = value === "Türkçe" ? 'tr' : 
                    value === "Deutsch" ? 'de' : 'en';
    changeLanguage(langCode as 'en' | 'tr' | 'de');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.language')}</h3>
      
      {saveMessage && (
        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-800/30 dark:text-green-400">
          {t('settings.savedSuccessfully')}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.selectLanguage')}</label>
          <select 
            className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
            value={getDisplayLanguage()}
            onChange={handleLanguageChange}
          >
            <option value="English">{t('settings.english')}</option>
            <option value="Türkçe">{t('settings.turkish')}</option>
            <option value="Deutsch">{t('settings.german')}</option>
          </select>
        </div>
        
        <div className="mt-4">
          <h4 className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.languagePreview')}</h4>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('settings.previewText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
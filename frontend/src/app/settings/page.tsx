"use client";

import { useState } from "react";
import { FiUser, FiEye, FiBell, FiLock, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedTheme, setSelectedTheme] = useState("Light Theme");
  const [selectedFontSize, setSelectedFontSize] = useState("Medium");
  const [saveMessage, setSaveMessage] = useState("");

  // Get translations and language functions
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  // Convert language code to display name for dropdown
  const getDisplayLanguage = () => {
    switch (language) {
      case 'tr': return "Türkçe";
      case 'de': return "Deutsch";
      default: return "English";
    }
  };

  const tabs = [
    { id: "profile", label: t('settings.profile'), icon: FiUser },
    { id: "appearance", label: t('settings.appearance'), icon: FiEye },
    { id: "notifications", label: t('settings.notifications'), icon: FiBell },
    { id: "security", label: t('settings.security'), icon: FiLock },
    { id: "language", label: t('settings.language'), icon: FiGlobe },
  ];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-gray-800">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full bg-white border-r border-gray-100 dark:bg-gray-800 dark:border-gray-700 md:w-64">
              <div className="p-4">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">{t('settings.title')}</h2>
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
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

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === "profile" && (
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
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.appearance')}</h3>
                  {saveMessage && (
                    <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md dark:bg-green-800/30 dark:text-green-400">
                      {t('settings.savedSuccessfully')}
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
                        onClick={() => {
                          localStorage.setItem('theme', selectedTheme === t('settings.darkTheme') ? 'dark' : 'light');
                          localStorage.setItem('fontSize', selectedFontSize.toLowerCase());
                          
                          setSaveMessage("Appearance settings saved successfully!");
                        
                          setTimeout(() => {
                            setSaveMessage("");
                          }, 3000);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        {t('common.save')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.notifications')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.emailNotifications')}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.receiveUpdates')}</p>
                      </div>
                      <button className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow pointer-events-none ring-0 dark:bg-gray-300" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.pushNotifications')}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.receiveInstant')}</p>
                      </div>
                      <button className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-blue-600 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-5 bg-white rounded-full shadow pointer-events-none ring-0" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('settings.security')}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.currentPassword')}</label>
                      <div className="relative mt-1">
                        <input
                          type="password"
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
                          className="block w-full pl-4 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                          placeholder={t('settings.newPassword')}
                        />
                      </div>
                    </div>
                  
                  </div>
                </div>
              )}
              
              {activeTab === "language" && (
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
                        onChange={(e) => {
                          const langCode = e.target.value === "Türkçe" ? 'tr' : 
                                          e.target.value === "Deutsch" ? 'de' : 'en';
                          changeLanguage(langCode as 'en' | 'tr' | 'de');
                          
                          setSaveMessage(t('settings.savedSuccessfully'));
                          setTimeout(() => setSaveMessage(""), 3000);
                        }}
                      >
                        <option value="English">{t('settings.english')}</option>
                        <option value="Türkçe">{t('settings.turkish')}</option>
                        <option value="Deutsch">{t('settings.german')}</option>
                      </select>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.languagePreview')}</h4>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {t('settings.previewText')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
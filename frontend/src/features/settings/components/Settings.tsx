import React from "react";
import { SettingsSidebar } from "./SettingsSidebar";
import { ProfileSettings } from "./ProfileSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import { LanguageSettings } from "./LanguageSettings";
import { useSettings } from "../hooks/useSettings";
import { useTranslation } from "react-i18next";

export const Settings: React.FC = () => {
  const {
    activeTab,
    changeTab,
    selectedTheme,
    setSelectedTheme,
    selectedFontSize,
    setSelectedFontSize,
    saveMessage,
    errorMessage,
    isSubmitting,
    passwordData,
    handlePasswordChange,
    handlePasswordSubmit,
    saveAppearanceSettings
  } = useSettings();
  
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {t('settings.title')}
          </h1>
          {saveMessage && (
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium">
              {saveMessage}
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="flex min-h-[600px]">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-100 dark:border-gray-700">
              <SettingsSidebar activeTab={activeTab} onTabChange={changeTab} />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="max-w-3xl mx-auto">
                <div className="transition-all duration-300 ease-in-out">
                  {activeTab === "profile" && <ProfileSettings />}

                  {activeTab === "appearance" && (
                    <AppearanceSettings
                      selectedTheme={selectedTheme}
                      setSelectedTheme={setSelectedTheme}
                      selectedFontSize={selectedFontSize}
                      setSelectedFontSize={setSelectedFontSize}
                      saveMessage={saveMessage}
                      saveAppearanceSettings={saveAppearanceSettings}
                    />
                  )}
                  
                  {activeTab === "notifications" && <NotificationSettings />}

                  {activeTab === "security" && (
                    <SecuritySettings
                      passwordData={passwordData}
                      handlePasswordChange={handlePasswordChange}
                      handlePasswordSubmit={handlePasswordSubmit}
                      errorMessage={errorMessage}
                      saveMessage={saveMessage}
                      isSubmitting={isSubmitting}
                    />
                  )}

                  {activeTab === "language" && (
                    <LanguageSettings saveMessage={saveMessage} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
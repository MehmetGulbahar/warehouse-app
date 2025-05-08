import React from "react";
import { SettingsSidebar } from "./SettingsSidebar";
import { ProfileSettings } from "./ProfileSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import { LanguageSettings } from "./LanguageSettings";
import { useSettings } from "../hooks/useSettings";

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

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-gray-800">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <SettingsSidebar activeTab={activeTab} onTabChange={changeTab} />

            {/* Content */}
            <div className="flex-1 p-6">
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
  );
};
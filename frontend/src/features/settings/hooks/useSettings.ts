'use client';

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedTheme, setSelectedTheme] = useState("Light Theme");
  const [selectedFontSize, setSelectedFontSize] = useState("Medium");
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { t } = useTranslation();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    setSaveMessage("");
    setErrorMessage("");
  };

  const saveAppearanceSettings = () => {
    localStorage.setItem('theme', selectedTheme === t('settings.darkTheme') ? 'dark' : 'light');
    localStorage.setItem('fontSize', selectedFontSize.toLowerCase());
    
    setSaveMessage(t('settings.savedSuccessfully'));
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSaveMessage("");
    
    try {
      const response = await fetch('http://localhost:5210/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(passwordData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSaveMessage(t('settings.savedSuccessfully'));
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setErrorMessage(data.message || "Failed to change password");
      }
    } catch (error) {
      setErrorMessage("An error occurred while changing password");
      console.error("Password change error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activeTab,
    changeTab,
    selectedTheme,
    setSelectedTheme,
    selectedFontSize,
    setSelectedFontSize,
    saveMessage,
    setSaveMessage,
    errorMessage,
    setErrorMessage,
    isSubmitting,
    passwordData,
    handlePasswordChange,
    handlePasswordSubmit,
    saveAppearanceSettings
  };
};
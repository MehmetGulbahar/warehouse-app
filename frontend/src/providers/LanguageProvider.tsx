"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../i18n/config';

type Language = 'en' | 'tr' | 'de';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const i18n = i18nConfig();
  useTranslation();
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const validLang = savedLanguage === 'turkish' ? 'tr' : 
                        savedLanguage === 'german' ? 'de' : 'en';
      changeLanguage(validLang as Language);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    
    const languageName = lang === 'en' ? 'english' : 
                          lang === 'tr' ? 'turkish' : 'german';
    localStorage.setItem('language', languageName);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
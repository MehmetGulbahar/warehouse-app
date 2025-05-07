'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import trTranslation from './locales/tr.json';
import deTranslation from './locales/de.json';

const i18nConfig = () => {
  if (i18n.isInitialized) return i18n;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation
        },
        tr: {
          translation: trTranslation
        },
        de: {
          translation: deTranslation
        }
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false 
      },
      // Only initialize once on the client
      react: { 
        useSuspense: false 
      }
    });

  return i18n;
};

export default i18nConfig;
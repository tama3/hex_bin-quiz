
import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode } from 'react';
import { translations, Locale, TranslationSet } from '../locales';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: string) => void; // Changed from Locale to string
  t: (key: keyof TranslationSet, ...args: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLocale = (): Locale => {
  const storedLocale = localStorage.getItem('quizAppLocale') as Locale | null;
  if (storedLocale && translations[storedLocale]) {
    return storedLocale;
  }
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('ja') && translations.ja) return 'ja';
  if (browserLang.startsWith('en') && translations.en) return 'en';
  if ((browserLang.startsWith('zh-cn') || browserLang === 'zh') && translations['zh-CN']) return 'zh-CN';
  if (browserLang.startsWith('ko') && translations.ko) return 'ko';
  
  return 'ja'; // Default to Japanese
};

// Type guard to check if a string is a valid Locale
const isValidLocale = (value: string): value is Locale => {
  return ['ja', 'en', 'zh-CN', 'ko'].includes(value);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('quizAppLocale', locale);
    let langAttr = locale;
    if (locale === 'zh-CN') langAttr = 'zh-CN';
    else langAttr = locale.split('-')[0];
    document.documentElement.lang = langAttr;
  }, [locale]);

  const setLocale = (localeValue: string) => { // Parameter changed to string
    if (isValidLocale(localeValue) && translations[localeValue]) { // Validate and check existence
      setLocaleState(localeValue); // localeValue is now confirmed as Locale
    } else {
      console.warn(`Attempted to set invalid locale: ${localeValue}`);
    }
  };

  const t = useCallback((key: keyof TranslationSet, ...args: any[]): string => {
    const translationSet = translations[locale] || translations.en; // Fallback to English
    const translationValue = translationSet[key];

    if (typeof translationValue === 'function') {
      return (translationValue as (...args: any[]) => string)(...args);
    }
    return translationValue || String(key); // Fallback to key name if translation missing
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

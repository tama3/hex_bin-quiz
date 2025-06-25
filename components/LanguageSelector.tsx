import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Locale } from '../locales';

const LanguageSelector: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();

  const supportedLocales: { code: Locale; name: string }[] = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'ko', name: '한국어' },
    { code: 'th', name: 'ไทย' },
  ];

  return (
    <div className="my-6 flex items-center justify-center space-x-2">
      <label htmlFor="language-select" className="text-slate-700 font-medium">
        {t('languageSelectorLabel')}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)} // Removed 'as Locale' assertion
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-700"
        aria-label={t('languageSelectorLabel')}
      >
        {supportedLocales.map(loc => (
          <option key={loc.code} value={loc.code}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

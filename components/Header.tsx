import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="bg-brand-secondary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={`/${language}/hub`} className="text-xl md:text-2xl font-bold text-brand-text hover:text-brand-accent transition-colors">
          {t('app_title')}
        </Link>
        <div className="relative">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-brand-dark border border-brand-accent text-brand-text text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block w-full p-2.5 appearance-none"
            aria-label="Select language"
          >
            <option value={Language.EN}>English</option>
            <option value={Language.ES}>Español</option>
            <option value={Language.FR}>Français</option>
            <option value={Language.DE}>Deutsch</option>
            <option value={Language.IT}>Italiano</option>
            <option value={Language.PT}>Português</option>
            <option value={Language.RU}>Русский</option>
            <option value={Language.ZH_CN}>中文 (简体)</option>
            <option value={Language.ZH_TW}>中文 (繁體)</option>
            <option value={Language.JA}>日本語</option>
            <option value={Language.KO}>한국어</option>
            <option value={Language.AR}>العربية</option>
            <option value={Language.TR}>Türkçe</option>
            <option value={Language.HI}>हिन्दी</option>
            <option value={Language.UR}>اردو</option>
            <option value={Language.BN}>বাংলা</option>
            <option value={Language.ID}>Bahasa Indonesia</option>
            <option value={Language.MS}>Bahasa Melayu</option>
            <option value={Language.NL}>Nederlands</option>
            <option value={Language.PL}>Polski</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-subtext">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

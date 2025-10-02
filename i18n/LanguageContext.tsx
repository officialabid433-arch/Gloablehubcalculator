import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Language } from '../types';
import { translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, section?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getBrowserLanguage = (): Language => {
    if (typeof navigator === 'undefined') return Language.EN;
    const lang = navigator.language.toLowerCase();
    
    if (lang.startsWith('es')) return Language.ES;
    if (lang.startsWith('fr')) return Language.FR;
    if (lang.startsWith('de')) return Language.DE;
    if (lang.startsWith('it')) return Language.IT;
    if (lang.startsWith('pt')) return Language.PT;
    if (lang.startsWith('ru')) return Language.RU;
    if (lang === 'zh-cn' || lang.startsWith('zh-sg')) return Language.ZH_CN;
    if (lang === 'zh-tw' || lang.startsWith('zh-hk')) return Language.ZH_TW;
    if (lang.startsWith('ja')) return Language.JA;
    if (lang.startsWith('ko')) return Language.KO;
    if (lang.startsWith('ar')) return Language.AR;
    if (lang.startsWith('tr')) return Language.TR;
    if (lang.startsWith('hi')) return Language.HI;
    if (lang.startsWith('ur')) return Language.UR;
    if (lang.startsWith('bn')) return Language.BN;
    if (lang.startsWith('id')) return Language.ID;
    if (lang.startsWith('ms')) return Language.MS;
    if (lang.startsWith('nl')) return Language.NL;
    if (lang.startsWith('pl')) return Language.PL;
    
    return Language.EN; // Default
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguageState] = useState<Language>(() => {
    const langFromUrl = params.lang as Language;
    if (Object.values(Language).includes(langFromUrl)) {
      return langFromUrl;
    }
    return getBrowserLanguage();
  });

  useEffect(() => {
    const langFromUrl = params.lang as Language;
    if (!langFromUrl || !Object.values(Language).includes(langFromUrl)) {
      const path = location.pathname.substring(1); // remove leading '/'
      const pathWithoutLang = path.split('/').slice(1).join('/');
      const newPath = `/${language}/${pathWithoutLang || 'hub'}`;
      navigate(newPath, { replace: true });
    }
  }, [language, location.pathname, navigate, params.lang]);

  useEffect(() => {
    const langFromUrl = params.lang as Language;
    if (langFromUrl && Object.values(Language).includes(langFromUrl) && langFromUrl !== language) {
        setLanguageState(langFromUrl);
    }
  }, [params.lang, language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    const pathParts = window.location.hash.split('/');
    pathParts[1] = newLanguage;
    navigate(pathParts.slice(1).join('/'));
  };

  const t = (key: string, section?: string): string => {
    const langTranslations = translations[language] || translations[Language.EN];
    if (section) {
        const sectionObject = langTranslations[section];
        if (typeof sectionObject === 'object' && key in sectionObject) {
            return sectionObject[key];
        }
    }
    const translation = langTranslations[key];
    if (typeof translation === 'string') {
      return translation;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

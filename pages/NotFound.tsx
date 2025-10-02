
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

const NotFound: React.FC = () => {
    const { language } = useLanguage();
    const t = useTranslations();
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-brand-accent">404</h1>
      <h2 className="text-3xl font-semibold mt-4">{t('page_not_found')}</h2>
      <p className="text-brand-subtext mt-2">{t('page_not_found_desc')}</p>
      <Link
        to={`/${language}/hub`}
        className="mt-8 inline-block bg-brand-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
      >
        {t('go_back')}
      </Link>
    </div>
  );
};

export default NotFound;

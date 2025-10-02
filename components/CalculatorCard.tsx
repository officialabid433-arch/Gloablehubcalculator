
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

interface CalculatorCardProps {
  calculator: Calculator;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();
  const { titleKey, descriptionKey, path, icon } = calculator;

  return (
    <Link 
      to={`/${language}${path}`} 
      className="bg-brand-secondary p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-start"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-brand-text mb-2">{t(titleKey)}</h3>
      <p className="text-brand-subtext text-sm flex-grow">{t(descriptionKey)}</p>
    </Link>
  );
};

export default CalculatorCard;


import React from 'react';
import { CALCULATORS } from '../constants';
import CalculatorCard from '../components/CalculatorCard';
import { useTranslations } from '../hooks/useTranslations';

const Hub: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-brand-text">{t('app_title')}</h1>
      <p className="text-lg text-brand-subtext mb-12">{t('all_calculators')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CALCULATORS.map(calc => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>
    </div>
  );
};

export default Hub;

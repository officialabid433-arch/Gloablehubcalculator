import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface CAGRCalculatorProps {
  calculator: Calculator;
}

const CAGRCalculator: React.FC<CAGRCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [beginningValue, setBeginningValue] = useState('10000');
  const [endingValue, setEndingValue] = useState('25000');
  const [years, setYears] = useState('5');
  
  const [results, setResults] = useState<{ cagr: number; totalGrowth: number } | null>(null);

  const handleCalculate = () => {
    const bv = parseFloat(beginningValue);
    const ev = parseFloat(endingValue);
    const n = parseFloat(years);

    if (bv > 0 && ev > 0 && n > 0) {
      const cagr = (Math.pow(ev / bv, 1 / n) - 1) * 100;
      const totalGrowth = ((ev - bv) / bv) * 100;
      setResults({ cagr, totalGrowth });
    }
  };

  const handleReset = () => {
    setBeginningValue('10000');
    setEndingValue('25000');
    setYears('5');
    setResults(null);
  };

  return (
    <div>
      <Link to={`/${language}/hub`} className="text-brand-accent hover:underline mb-6 inline-block">&larr; {t('go_back')}</Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t(calculator.titleKey)}</h1>
        <p className="text-brand-subtext">{t(calculator.descriptionKey)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-brand-secondary p-6 rounded-lg shadow-lg space-y-6">
          <Input label={t('beginning_value')} id="beginningValue" type="number" value={beginningValue} onChange={e => setBeginningValue(e.target.value)} />
          <Input label={t('ending_value')} id="endingValue" type="number" value={endingValue} onChange={e => setEndingValue(e.target.value)} />
          <Input label={t('number_of_years')} id="years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>{t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label={t('cagr')} value={`${formatNumber(results.cagr)}%`} isEmphasized />
                <ResultCard label={t('total_growth')} value={`${formatNumber(results.totalGrowth)}%`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CAGRCalculator;
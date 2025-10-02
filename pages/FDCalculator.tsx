import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface FDCalculatorProps {
  calculator: Calculator;
}

const FDCalculator: React.FC<FDCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('7.1');
  const [years, setYears] = useState('5');
  const [compoundFrequency, setCompoundFrequency] = useState('4');

  const [results, setResults] = useState<{ maturityValue: number; totalInterest: number } | null>(null);

  const handleCalculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t_years = parseFloat(years);
    const n = parseInt(compoundFrequency);

    if (P > 0 && r > 0 && t_years > 0 && n > 0) {
      const maturityValue = P * Math.pow(1 + r / n, n * t_years);
      const totalInterest = maturityValue - P;
      setResults({ maturityValue, totalInterest });
    }
  };

  const handleReset = () => {
    setPrincipal('100000');
    setRate('7.1');
    setYears('5');
    setCompoundFrequency('4');
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
          <Input label={t('deposit_amount')} id="principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          <Input label={t('interest_rate')} id="rate" type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} />
          <Input label={`${t('tenure')} (${t('years')})`} id="years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          <Select label={t('compound_frequency')} id="compoundFrequency" value={compoundFrequency} onChange={e => setCompoundFrequency(e.target.value)}>
            <option value="1">{t('annually')}</option>
            <option value="2">{t('semi_annually')}</option>
            <option value="4">{t('quarterly')}</option>
            <option value="12">{t('monthly')}</option>
          </Select>
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
                <ResultCard label={t('maturity_value')} value={formatCurrency(results.maturityValue)} isEmphasized />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface RDCalculatorProps {
  calculator: Calculator;
}

const RDCalculator: React.FC<RDCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [monthlyDeposit, setMonthlyDeposit] = useState('2000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('5');
  
  const [results, setResults] = useState<{ maturityValue: number; totalInterest: number; investedAmount: number } | null>(null);

  const handleCalculate = () => {
    const R = parseFloat(monthlyDeposit);
    const i = parseFloat(rate) / 100 / 4; // Compounded quarterly
    const t_years = parseFloat(years);
    const n = t_years * 4; // Number of quarters

    if (R > 0 && i > 0 && n > 0) {
      // The formula for RD maturity value is complex. A simplified loop is easier to implement and understand.
      let maturityValue = 0;
      for (let m = t_years * 12; m > 0; m--) {
          maturityValue += R * Math.pow(1 + (parseFloat(rate)/100)/12, m);
      }
      
      const investedAmount = R * t_years * 12;
      const totalInterest = maturityValue - investedAmount;
      setResults({ maturityValue, totalInterest, investedAmount });
    }
  };

  const handleReset = () => {
    setMonthlyDeposit('2000');
    setRate('6.5');
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
          <Input label={t('monthly_deposit')} id="monthlyDeposit" type="number" value={monthlyDeposit} onChange={e => setMonthlyDeposit(e.target.value)} />
          <Input label={t('interest_rate')} id="rate" type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} />
          <Input label={`${t('tenure')} (${t('years')})`} id="years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>{t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label={t('maturity_value')} value={formatCurrency(results.maturityValue)} isEmphasized />
                 <ResultCard label={t('invested_amount')} value={formatCurrency(results.investedAmount)} />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RDCalculator;

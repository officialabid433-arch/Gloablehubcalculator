import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface ROICalculatorProps {
  calculator: Calculator;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('15000');
  
  const [results, setResults] = useState<{ netProfit: number; roi: number } | null>(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (initial > 0) {
      const netProfit = final - initial;
      const roi = (netProfit / initial) * 100;
      setResults({ netProfit, roi });
    }
  };

  const handleReset = () => {
    setInitialInvestment('10000');
    setFinalValue('15000');
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
          <Input label={t('initial_investment')} id="initialInvestment" type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} />
          <Input label={t('final_value')} id="finalValue" type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} />
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
                <ResultCard label={t('roi_percentage')} value={`${formatNumber(results.roi)}%`} isEmphasized />
                <ResultCard label={t('net_profit')} value={formatCurrency(results.netProfit)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface ProfitMarginCalculatorProps {
  calculator: Calculator;
}

const ProfitMarginCalculator: React.FC<ProfitMarginCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [revenue, setRevenue] = useState('50000');
  const [cogs, setCogs] = useState('20000');
  
  const [results, setResults] = useState<{ grossProfit: number; margin: number } | null>(null);

  const handleCalculate = () => {
    const rev = parseFloat(revenue);
    const cost = parseFloat(cogs);

    if (rev > 0) {
      const grossProfit = rev - cost;
      const margin = (grossProfit / rev) * 100;
      setResults({ grossProfit, margin });
    }
  };

  const handleReset = () => {
    setRevenue('50000');
    setCogs('20000');
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
          <Input label={t('revenue')} id="revenue" type="number" value={revenue} onChange={e => setRevenue(e.target.value)} />
          <Input label={t('cost_of_goods_sold')} id="cogs" type="number" value={cogs} onChange={e => setCogs(e.target.value)} />
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
                <ResultCard label={t('gross_profit_margin')} value={`${formatNumber(results.margin)}%`} isEmphasized />
                <ResultCard label={t('gross_profit')} value={formatCurrency(results.grossProfit)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitMarginCalculator;
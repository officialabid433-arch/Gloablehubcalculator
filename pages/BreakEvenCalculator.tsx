import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface BreakEvenCalculatorProps {
  calculator: Calculator;
}

const BreakEvenCalculator: React.FC<BreakEvenCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [fixedCosts, setFixedCosts] = useState('10000');
  const [pricePerUnit, setPricePerUnit] = useState('50');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('20');
  
  const [results, setResults] = useState<{ breakEvenUnits: number; contributionMargin: number } | null>(null);

  const handleCalculate = () => {
    const fc = parseFloat(fixedCosts);
    const ppu = parseFloat(pricePerUnit);
    const vcu = parseFloat(variableCostPerUnit);

    const contributionMargin = ppu - vcu;
    if (contributionMargin > 0) {
      const breakEvenUnits = fc / contributionMargin;
      setResults({ breakEvenUnits, contributionMargin });
    } else {
        setResults(null); // Avoid division by zero or negative margin
    }
  };

  const handleReset = () => {
    setFixedCosts('10000');
    setPricePerUnit('50');
    setVariableCostPerUnit('20');
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
          <Input label={t('fixed_costs')} id="fixedCosts" type="number" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} />
          <Input label={t('price_per_unit')} id="pricePerUnit" type="number" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} />
          <Input label={t('variable_cost_per_unit')} id="variableCostPerUnit" type="number" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(e.target.value)} />
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
                <ResultCard label={t('break_even_units')} value={formatNumber(results.breakEvenUnits)} isEmphasized />
                <ResultCard label={t('contribution_margin')} value={formatCurrency(results.contributionMargin)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
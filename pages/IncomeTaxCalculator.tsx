import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { taxCountries, calculateIncomeTax } from '../services/taxService';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface IncomeTaxCalculatorProps {
  calculator: Calculator;
}

const IncomeTaxCalculator: React.FC<IncomeTaxCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [income, setIncome] = useState('60000');
  const [country, setCountry] = useState('USA');
  const [results, setResults] = useState<{ totalTax: number; netIncome: number; effectiveRate: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    const incomeVal = parseFloat(income);
    if (isNaN(incomeVal) || incomeVal < 0) {
      setError('Please enter a valid income.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const taxResult = await calculateIncomeTax(incomeVal, country);
      setResults(taxResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIncome('60000');
    setCountry('USA');
    setResults(null);
    setError('');
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
          <Input label={t('annual_income')} id="annualIncome" type="number" value={income} onChange={e => setIncome(e.target.value)} />
          <Select label={t('country')} id="country" value={country} onChange={e => setCountry(e.target.value)}>
            {taxCountries.map(c => <option key={c} value={c}>{t(c.toLowerCase())}</option>)}
          </Select>
          <div className="flex space-x-4">
            <Button onClick={handleCalculate} disabled={isLoading}>{isLoading ? '...' : t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {results && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label={t('total_tax')} value={formatCurrency(results.totalTax, country)} isEmphasized />
                <ResultCard label={t('net_income')} value={formatCurrency(results.netIncome, country)} />
                <ResultCard label={t('effective_tax_rate')} value={`${formatNumber(results.effectiveRate)}%`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;

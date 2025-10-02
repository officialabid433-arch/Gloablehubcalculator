import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { availableCountries, availableYears, getInflationAdjustedValue } from '../services/inflationService';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface InflationCalculatorProps {
  calculator: Calculator;
}

const InflationCalculator: React.FC<InflationCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [initialAmount, setInitialAmount] = useState('1000');
  const [startYear, setStartYear] = useState(availableYears[0].toString());
  const [endYear, setEndYear] = useState(availableYears[availableYears.length - 1].toString());
  const [country, setCountry] = useState(availableCountries[0]);
  
  const [results, setResults] = useState<{ adjustedValue: number; totalInflation: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleCalculate = useCallback(async () => {
    const amount = parseFloat(initialAmount);
    const sYear = parseInt(startYear);
    const eYear = parseInt(endYear);

    if (amount > 0 && sYear < eYear) {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getInflationAdjustedValue(amount, sYear, eYear, country);
        setResults(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    } else if (sYear >= eYear) {
        setError("Start year must be before end year.");
        setResults(null);
    }
  }, [initialAmount, startYear, endYear, country]);

  const handleReset = () => {
    setInitialAmount('1000');
    setStartYear(availableYears[0].toString());
    setEndYear(availableYears[availableYears.length - 1].toString());
    setCountry(availableCountries[0]);
    setResults(null);
    setError(null);
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  return (
    <div>
      <Link to={`/${language}/hub`} className="text-brand-accent hover:underline mb-6 inline-block">&larr; {t('go_back')}</Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t(calculator.titleKey)}</h1>
        <p className="text-brand-subtext">{t(calculator.descriptionKey)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-brand-secondary p-6 rounded-lg shadow-lg space-y-6">
          <Input label={t('initial_amount')} id="initialAmount" type="number" value={initialAmount} onChange={e => setInitialAmount(e.target.value)} />
          <Select label={t('start_year')} id="startYear" value={startYear} onChange={e => setStartYear(e.target.value)}>
            {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
          </Select>
          <Select label={t('end_year')} id="endYear" value={endYear} onChange={e => setEndYear(e.target.value)}>
            {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
          </Select>
          <Select label={t('country')} id="country" value={country} onChange={e => setCountry(e.target.value)}>
            {availableCountries.map(c => <option key={c} value={c}>{t(c.toLowerCase())}</option>)}
          </Select>
          <div className="flex space-x-4">
            <Button onClick={handleCalculate} disabled={isLoading}>{isLoading ? '...' : t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {results && !isLoading && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultCard label={t('adjusted_for_inflation')} value={formatCurrency(results.adjustedValue)} isEmphasized />
                <ResultCard label={t('total_inflation')} value={`${formatNumber(results.totalInflation)}%`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InflationCalculator;
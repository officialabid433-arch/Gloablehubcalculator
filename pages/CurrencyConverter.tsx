
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { currencies, getConversionRate, getLastUpdatedTimestamp } from '../services/currencyService';
import { formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

interface CurrencyConverterProps {
  calculator: Calculator;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUpdated = getLastUpdatedTimestamp();

  const handleConversion = useCallback(async () => {
    if (!amount) return;
    setIsLoading(true);
    setError(null);
    try {
      const rate = await getConversionRate(fromCurrency, toCurrency);
      const result = parseFloat(amount) * rate;
      setConvertedAmount(formatNumber(result));
    } catch (err) {
      setError('Failed to fetch conversion rate.');
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);


  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <Link to={`/${language}/hub`} className="text-brand-accent hover:underline mb-6 inline-block">&larr; {t('go_back')}</Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t(calculator.titleKey)}</h1>
        <p className="text-brand-subtext">{t(calculator.descriptionKey)}</p>
      </div>

      <div className="max-w-xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Input label={t('amount')} id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Select label={t('from')} id="fromCurrency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <button onClick={handleSwapCurrencies} className="p-2 rounded-full bg-brand-dark hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6">
            <div className="md:col-span-2 md:col-start-4">
                <Select label={t('to')} id="toCurrency" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
            </div>
        </div>

        <Button onClick={handleConversion} disabled={isLoading}>
          {isLoading ? '...' : t('calculate')}
        </Button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {convertedAmount && !isLoading && (
          <div className="mt-8 text-center bg-brand-dark p-6 rounded-lg">
            <p className="text-lg text-brand-subtext">{amount} {fromCurrency} =</p>
            <p className="text-4xl font-bold text-brand-accent my-2">{convertedAmount} {toCurrency}</p>
            <p className="text-xs text-brand-subtext">{t('last_updated')} {lastUpdated}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

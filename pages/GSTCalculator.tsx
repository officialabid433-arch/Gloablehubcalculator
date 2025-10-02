import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import { gstCountries, mockGstRates } from '../services/vatGstService';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface GSTCalculatorProps {
  calculator: Calculator;
}

const GSTCalculator: React.FC<GSTCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [amount, setAmount] = useState('100');
  const [gstRate, setGstRate] = useState(mockGstRates['Australia'].toString());
  const [calcType, setCalcType] = useState<'add' | 'extract'>('add');
  const [results, setResults] = useState<{ preTax: number; gstAmount: number; total: number } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;
    if (isNaN(price) || isNaN(rate)) return;

    if (calcType === 'add') {
      const gstAmount = price * rate;
      const total = price + gstAmount;
      setResults({ preTax: price, gstAmount, total });
    } else { // extract
      const preTax = price / (1 + rate);
      const gstAmount = price - preTax;
      setResults({ preTax, gstAmount, total: price });
    }
  };
  
  const handleReset = () => {
    setAmount('100');
    setGstRate(mockGstRates['Australia'].toString());
    setCalcType('add');
    setResults(null);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGstRate(e.target.value);
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
          <Input label={calcType === 'add' ? t('price_before_tax') : t('price_after_tax')} id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          <Select label={t('calculation_type')} id="calcType" value={calcType} onChange={e => setCalcType(e.target.value as 'add' | 'extract')}>
            <option value="add">{t('add_gst')}</option>
            <option value="extract">{t('extract_gst')}</option>
          </Select>
           <Select label={t('country')} id="country-gst" value={gstRate} onChange={handleCountryChange}>
            {gstCountries.map(c => <option key={c} value={mockGstRates[c]}>{`${c} (${mockGstRates[c]}%)`}</option>)}
          </Select>
          <Input label={t('gst_rate')} id="gstRate" type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
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
                <ResultCard label={t('price_before_tax')} value={formatCurrency(results.preTax)} />
                <ResultCard label={t('gst_amount')} value={formatCurrency(results.gstAmount)} />
                <ResultCard label={t('total_price')} value={formatCurrency(results.total)} isEmphasized />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;

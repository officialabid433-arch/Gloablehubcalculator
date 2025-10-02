import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import { vatCountries, mockVatRates } from '../services/vatGstService';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface VATCalculatorProps {
  calculator: Calculator;
}

const VATCalculator: React.FC<VATCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [amount, setAmount] = useState('100');
  const [vatRate, setVatRate] = useState(mockVatRates['UK'].toString());
  const [calcType, setCalcType] = useState<'add' | 'extract'>('add');
  const [results, setResults] = useState<{ preTax: number; vatAmount: number; total: number } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(amount);
    const rate = parseFloat(vatRate) / 100;
    if (isNaN(price) || isNaN(rate)) return;

    if (calcType === 'add') {
      const vatAmount = price * rate;
      const total = price + vatAmount;
      setResults({ preTax: price, vatAmount, total });
    } else { // extract
      const preTax = price / (1 + rate);
      const vatAmount = price - preTax;
      setResults({ preTax, vatAmount, total: price });
    }
  };
  
  const handleReset = () => {
    setAmount('100');
    setVatRate(mockVatRates['UK'].toString());
    setCalcType('add');
    setResults(null);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVatRate(e.target.value);
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
            <option value="add">{t('add_vat')}</option>
            <option value="extract">{t('extract_vat')}</option>
          </Select>
           <Select label={t('country')} id="country-vat" value={vatRate} onChange={handleCountryChange}>
            {vatCountries.map(c => <option key={c} value={mockVatRates[c]}>{`${c} (${mockVatRates[c]}%)`}</option>)}
          </Select>
          <Input label={t('vat_rate')} id="vatRate" type="number" value={vatRate} onChange={e => setVatRate(e.target.value)} />
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
                <ResultCard label={t('vat_amount')} value={formatCurrency(results.vatAmount)} />
                <ResultCard label={t('total_price')} value={formatCurrency(results.total)} isEmphasized />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;

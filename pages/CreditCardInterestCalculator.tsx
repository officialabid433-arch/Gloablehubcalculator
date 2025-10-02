import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface CreditCardInterestCalculatorProps {
  calculator: Calculator;
}

const CreditCardInterestCalculator: React.FC<CreditCardInterestCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [balance, setBalance] = useState('2000');
  const [apr, setApr] = useState('19.99');
  const [minPaymentPercent, setMinPaymentPercent] = useState('2');
  const [fixedPayment, setFixedPayment] = useState('100');
  
  const [minPayResults, setMinPayResults] = useState<{ months: number; totalInterest: number; totalPayment: number } | null>(null);
  const [fixedPayResults, setFixedPayResults] = useState<{ months: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculatePayoff = (isFixed: boolean) => {
    const P = parseFloat(balance);
    const r = parseFloat(apr) / 100 / 12;
    let months = 0;
    let totalInterest = 0;
    let currentBalance = P;

    if (isFixed) {
        const pmt = parseFloat(fixedPayment);
        if (P * r >= pmt) return null; // payment doesn't cover interest
        const num = Math.log(pmt / (pmt - P * r));
        const den = Math.log(1 + r);
        months = Math.ceil(num / den);
        const totalPayment = pmt * months;
        totalInterest = totalPayment - P;
        return { months, totalInterest, totalPayment };
    } else {
        const minP = parseFloat(minPaymentPercent) / 100;
        while (currentBalance > 0 && months < 600) { // cap at 50 years
            months++;
            const interest = currentBalance * r;
            totalInterest += interest;
            const minPayment = Math.max(25, currentBalance * minP);
            const principalPaid = minPayment - interest;
            if (principalPaid <= 0) return null; // never paying off
            currentBalance -= principalPaid;
        }
        return { months, totalInterest, totalPayment: P + totalInterest };
    }
  };

  const handleCalculate = () => {
    setMinPayResults(calculatePayoff(false));
    setFixedPayResults(calculatePayoff(true));
  };
  
  const handleReset = () => {
    setBalance('2000');
    setApr('19.99');
    setMinPaymentPercent('2');
    setFixedPayment('100');
    setMinPayResults(null);
    setFixedPayResults(null);
  };

  const formatMonths = (months: number) => {
      if (months >= 600) return "50+ years";
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} years, ${remainingMonths} months`;
  }

  return (
    <div>
      <Link to={`/${language}/hub`} className="text-brand-accent hover:underline mb-6 inline-block">&larr; {t('go_back')}</Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t(calculator.titleKey)}</h1>
        <p className="text-brand-subtext">{t(calculator.descriptionKey)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-brand-secondary p-6 rounded-lg shadow-lg space-y-6">
          <Input label={t('card_balance')} id="card_balance" type="number" value={balance} onChange={e => setBalance(e.target.value)} />
          <Input label={t('apr')} id="apr" type="number" step="0.01" value={apr} onChange={e => setApr(e.target.value)} />
          <Input label={`${t('min_payment')} (%)`} id="min_payment_percent" type="number" step="0.1" value={minPaymentPercent} onChange={e => setMinPaymentPercent(e.target.value)} />
          <Input label={t('fixed_payment_amount')} id="fixed_payment" type="number" value={fixedPayment} onChange={e => setFixedPayment(e.target.value)} />
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>{t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {minPayResults && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('if_min_payment')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label={t('payoff_time')} value={formatMonths(minPayResults.months)} isEmphasized />
                <ResultCard label={t('total_interest')} value={formatCurrency(minPayResults.totalInterest)} />
                <ResultCard label={t('total_payment')} value={formatCurrency(minPayResults.totalPayment)} />
              </div>
            </div>
          )}
           {fixedPayResults && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('if_fixed_payment')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label={t('payoff_time')} value={formatMonths(fixedPayResults.months)} isEmphasized />
                <ResultCard label={t('total_interest')} value={formatCurrency(fixedPayResults.totalInterest)} />
                <ResultCard label={t('total_payment')} value={formatCurrency(fixedPayResults.totalPayment)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardInterestCalculator;

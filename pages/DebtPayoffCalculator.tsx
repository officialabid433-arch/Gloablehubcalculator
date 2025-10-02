import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import Select from '../components/ui/Select';

interface DebtPayoffCalculatorProps {
  calculator: Calculator;
}

interface Debt {
  id: number;
  name: string;
  balance: string;
  apr: string;
  minPayment: string;
}

const DebtPayoffCalculator: React.FC<DebtPayoffCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card', balance: '5000', apr: '22', minPayment: '100' },
    { id: 2, name: 'Student Loan', balance: '20000', apr: '6', minPayment: '250' },
  ]);
  const [extraPayment, setExtraPayment] = useState('200');
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [results, setResults] = useState<{ date: string; totalInterest: number; totalPrincipal: number } | null>(null);
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleDebtChange = (index: number, field: keyof Debt, value: string) => {
    const newDebts = [...debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setDebts(newDebts);
  };

  const addDebt = () => {
    setDebts([...debts, { id: Date.now(), name: '', balance: '', apr: '', minPayment: '' }]);
  };
  
  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index));
  };
  
  const handleCalculate = () => {
    let currentDebts = debts.map(d => ({
        ...d,
        balance: parseFloat(d.balance),
        apr: parseFloat(d.apr) / 100,
        minPayment: parseFloat(d.minPayment),
    })).filter(d => d.balance > 0);

    const extra = parseFloat(extraPayment);
    if (isNaN(extra) || extra < 0) return;

    let totalInterestPaid = 0;
    let months = 0;
    const paymentSchedule = [];

    while (currentDebts.some(d => d.balance > 0)) {
        months++;
        let monthSnowball = 0;
        let totalMinPaymentsDue = 0;
        
        // Calculate interest and sum minimum payments
        currentDebts.forEach(debt => {
            const interest = (debt.balance * debt.apr) / 12;
            totalInterestPaid += interest;
            debt.balance += interest;
            totalMinPaymentsDue += debt.minPayment;
        });
        
        let remainingExtra = extra;

        // Apply minimum payments
        currentDebts.forEach(debt => {
            const payment = Math.min(debt.balance, debt.minPayment);
            debt.balance -= payment;
            if (debt.balance < 0.01) {
                monthSnowball += debt.minPayment;
                debt.balance = 0;
            }
        });

        // Sort for snowball/avalanche
        if (strategy === 'snowball') {
            currentDebts.sort((a, b) => a.balance - b.balance);
        } else { // avalanche
            currentDebts.sort((a, b) => b.apr - a.apr);
        }

        // Apply extra payment + snowball
        let totalSnowballAmount = extra + monthSnowball;
        for(const debt of currentDebts) {
            if (debt.balance > 0 && totalSnowballAmount > 0) {
                const payment = Math.min(debt.balance, totalSnowballAmount);
                debt.balance -= payment;
                totalSnowballAmount -= payment;
            }
        }
        
        currentDebts = currentDebts.filter(d => d.balance > 0);
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    
    setResults({
        date: payoffDate.toLocaleDateString(language, { year: 'numeric', month: 'long' }),
        totalInterest: totalInterestPaid,
        totalPrincipal: debts.reduce((sum, d) => sum + parseFloat(d.balance), 0),
    });
  };

  const handleReset = () => {
    setDebts([
        { id: 1, name: 'Credit Card', balance: '5000', apr: '22', minPayment: '100' },
        { id: 2, name: 'Student Loan', balance: '20000', apr: '6', minPayment: '250' },
    ]);
    setExtraPayment('200');
    setStrategy('avalanche');
    setResults(null);
    setSchedule([]);
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
            <h3 className="text-xl font-bold">{t('debts')}</h3>
            {debts.map((debt, index) => (
                <div key={debt.id} className="p-4 border border-gray-700 rounded-lg space-y-2 relative">
                     <button onClick={() => removeDebt(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-400">&times;</button>
                    <Input label={t('debt_name')} id={`debtName-${index}`} type="text" value={debt.name} onChange={e => handleDebtChange(index, 'name', e.target.value)} />
                    <Input label={t('balance')} id={`balance-${index}`} type="number" value={debt.balance} onChange={e => handleDebtChange(index, 'balance', e.target.value)} />
                    <Input label={t('apr')} id={`apr-${index}`} type="number" value={debt.apr} onChange={e => handleDebtChange(index, 'apr', e.target.value)} />
                    <Input label={t('min_payment')} id={`minPayment-${index}`} type="number" value={debt.minPayment} onChange={e => handleDebtChange(index, 'minPayment', e.target.value)} />
                </div>
            ))}
            <Button onClick={addDebt} variant="secondary">{t('add_debt')}</Button>
            <hr className="border-gray-600" />
            <Input label={t('extra_monthly_payment')} id="extraPayment" type="number" value={extraPayment} onChange={e => setExtraPayment(e.target.value)} />
            <Select label={t('payoff_strategy')} id="strategy" value={strategy} onChange={e => setStrategy(e.target.value as any)}>
                <option value="avalanche">{t('avalanche')}</option>
                <option value="snowball">{t('snowball')}</option>
            </Select>
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
                <ResultCard label={t('debt_free_date')} value={results.date} isEmphasized />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
                <ResultCard label={t('total_principal')} value={formatCurrency(results.totalPrincipal)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebtPayoffCalculator;

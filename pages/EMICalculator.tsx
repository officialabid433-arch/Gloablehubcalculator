import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, AmortizationData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import AmortizationTable from '../components/AmortizationTable';

interface EMICalculatorProps {
  calculator: Calculator;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [loanAmount, setLoanAmount] = useState('500000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTerm, setLoanTerm] = useState('5');
  
  const [results, setResults] = useState<{ monthlyPayment: number; totalInterest: number; totalPayment: number } | null>(null);
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>([]);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const termMonths = parseFloat(loanTerm) * 12;

    if (principal > 0 && rate > 0 && termMonths > 0) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
      const totalPayment = monthlyPayment * termMonths;
      const totalInterest = totalPayment - principal;
      setResults({ monthlyPayment, totalInterest, totalPayment });
      
      let balance = principal;
      const schedule: AmortizationData[] = [];
      for (let i = 1; i <= termMonths; i++) {
        const interestPaid = balance * rate;
        const principalPaid = monthlyPayment - interestPaid;
        balance -= principalPaid;
        schedule.push({
          month: i,
          principal: formatCurrency(principalPaid),
          interest: formatCurrency(interestPaid),
          totalPayment: formatCurrency(monthlyPayment),
          remainingBalance: formatCurrency(balance > 0 ? balance : 0),
        });
      }
      setAmortizationData(schedule);
    }
  };

  const handleReset = () => {
    setLoanAmount('500000');
    setInterestRate('8.5');
    setLoanTerm('5');
    setResults(null);
    setAmortizationData([]);
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
          <Input label={t('loan_amount')} id="loanAmount" type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
          <Input label={t('interest_rate')} id="interestRate" type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
          <Input label={t('loan_term')} id="loanTerm" type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
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
                <ResultCard label={t('monthly_payment')} value={formatCurrency(results.monthlyPayment)} isEmphasized />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
                <ResultCard label={t('total_payment')} value={formatCurrency(results.totalPayment)} />
              </div>
              {amortizationData.length > 0 && <AmortizationTable data={amortizationData} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;

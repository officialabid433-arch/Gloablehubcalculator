
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RetirementCalculatorProps {
  calculator: Calculator;
}

const RetirementCalculator: React.FC<RetirementCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [annualContribution, setAnnualContribution] = useState('10000');
  const [returnRate, setReturnRate] = useState('7');

  const [results, setResults] = useState<{ retirementSavings: number; totalContributions: number; totalInterest: number } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCalculate = () => {
    const age = parseInt(currentAge);
    const retireAge = parseInt(retirementAge);
    const P = parseFloat(currentSavings);
    const PMT = parseFloat(annualContribution);
    const r = parseFloat(returnRate) / 100;
    const yearsToGrow = retireAge - age;

    if (yearsToGrow > 0 && P >= 0 && PMT >= 0 && r >= 0) {
      let futureValue = P;
      const data = [{ age: age, principal: P, interest: 0 }];

      for (let i = 1; i <= yearsToGrow; i++) {
        const interestEarned = futureValue * r;
        futureValue += PMT;
        futureValue += interestEarned;
        data.push({
          age: age + i,
          principal: P + PMT * i,
          interest: Math.round(futureValue - (P + PMT * i)),
        });
      }

      const totalContributions = P + (PMT * yearsToGrow);
      const totalInterest = futureValue - totalContributions;

      setResults({ retirementSavings: futureValue, totalContributions, totalInterest });
      setChartData(data);
    }
  };

  const handleReset = () => {
    setCurrentAge('30');
    setRetirementAge('65');
    setCurrentSavings('50000');
    setAnnualContribution('10000');
    setReturnRate('7');
    setResults(null);
    setChartData([]);
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
          <Input label={t('current_age')} id="currentAge" type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
          <Input label={t('retirement_age')} id="retirementAge" type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} />
          <Input label={t('current_savings')} id="currentSavings" type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
          <Input label={t('annual_contribution')} id="annualContribution" type="number" value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} />
          <Input label={t('investment_return_rate')} id="returnRate" type="number" step="0.01" value={returnRate} onChange={e => setReturnRate(e.target.value)} />
          <div className="flex space-x-4">
            <Button onClick={handleCalculate}>{t('calculate')}</Button>
            <Button onClick={handleReset} variant="secondary">{t('reset')}</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results && (
            <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <ResultCard label={t('retirement_savings')} value={formatCurrency(results.retirementSavings)} isEmphasized />
                <ResultCard label={t('total_contributions')} value={formatCurrency(results.totalContributions)} />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
              </div>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="age" stroke="#9CA3AF" />
                    <YAxis tickFormatter={(value) => formatCurrency(value as number)} stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="principal" stackId="a" name={t('principal')} fill="#1E3A8A" />
                    <Bar dataKey="interest" stackId="a" name={t('interest')} fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;

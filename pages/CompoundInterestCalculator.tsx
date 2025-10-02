
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompoundInterestCalculatorProps {
  calculator: Calculator;
}

const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();
  
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [interestRate, setInterestRate] = useState('7');
  const [yearsToGrow, setYearsToGrow] = useState('20');
  const [compoundFrequency, setCompoundFrequency] = useState('12');

  const [results, setResults] = useState<{ futureValue: number; totalContributions: number; totalInterest: number } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCalculate = () => {
    const P = parseFloat(initialInvestment);
    const PMT = parseFloat(monthlyContribution);
    const r = parseFloat(interestRate) / 100;
    const t_years = parseFloat(yearsToGrow);
    const n = parseInt(compoundFrequency);
    
    if (P >= 0 && PMT >= 0 && r > 0 && t_years > 0 && n > 0) {
      const data = [];
      let currentBalance = P;
      data.push({ year: 0, value: P });

      for (let year = 1; year <= t_years; year++) {
        for (let i = 0; i < 12; i++) {
            currentBalance += PMT;
        }
        currentBalance *= (1 + r / n)**n;
        data.push({ year, value: Math.round(currentBalance) });
      }

      const futureValue = currentBalance;
      const totalContributions = P + (PMT * 12 * t_years);
      const totalInterest = futureValue - totalContributions;

      setResults({ futureValue, totalContributions, totalInterest });
      setChartData(data);
    }
  };

  const handleReset = () => {
    setInitialInvestment('10000');
    setMonthlyContribution('500');
    setInterestRate('7');
    setYearsToGrow('20');
    setCompoundFrequency('12');
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
          <Input label={t('initial_investment')} id="initialInvestment" type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} />
          <Input label={t('monthly_contribution')} id="monthlyContribution" type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
          <Input label={t('interest_rate')} id="interestRate" type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
          <Input label={t('years_to_grow')} id="yearsToGrow" type="number" value={yearsToGrow} onChange={e => setYearsToGrow(e.target.value)} />
          <Select label={t('compound_frequency')} id="compoundFrequency" value={compoundFrequency} onChange={e => setCompoundFrequency(e.target.value)}>
            <option value="12">{t('monthly')}</option>
            <option value="4">{t('quarterly')}</option>
            <option value="2">{t('semi_annually')}</option>
            <option value="1">{t('annually')}</option>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <ResultCard label={t('future_value')} value={formatCurrency(results.futureValue)} isEmphasized />
                <ResultCard label={t('total_contributions')} value={formatCurrency(results.totalContributions)} />
                <ResultCard label={t('total_interest')} value={formatCurrency(results.totalInterest)} />
              </div>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis tickFormatter={(value) => formatCurrency(value as number)} stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
                    <Legend />
                    <Line type="monotone" dataKey="value" name={t('future_value')} stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SIPCalculatorProps {
  calculator: Calculator;
}

const SIPCalculator: React.FC<SIPCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [returnRate, setReturnRate] = useState('12');
  const [period, setPeriod] = useState('10');

  const [results, setResults] = useState<{ futureValue: number; investedAmount: number; estimatedReturns: number } | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCalculate = () => {
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(returnRate) / 100 / 12;
    const n = parseFloat(period) * 12;

    if (P > 0 && i > 0 && n > 0) {
      const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const investedAmount = P * n;
      const estimatedReturns = futureValue - investedAmount;
      setResults({ futureValue, investedAmount, estimatedReturns });

      // Generate chart data
      const data = [];
      let currentBalance = 0;
      for (let year = 1; year <= parseFloat(period); year++) {
        let yearEndValue = currentBalance;
        for (let month = 1; month <= 12; month++) {
          yearEndValue = (yearEndValue + P) * (1 + i);
        }
        currentBalance = yearEndValue;
        data.push({ year, value: Math.round(currentBalance) });
      }
      setChartData(data);
    }
  };

  const handleReset = () => {
    setMonthlyInvestment('5000');
    setReturnRate('12');
    setPeriod('10');
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
          <Input label={t('monthly_investment')} id="monthlyInvestment" type="number" value={monthlyInvestment} onChange={e => setMonthlyInvestment(e.target.value)} />
          <Input label={t('expected_return_rate')} id="returnRate" type="number" step="0.1" value={returnRate} onChange={e => setReturnRate(e.target.value)} />
          <Input label={t('investment_period')} id="period" type="number" value={period} onChange={e => setPeriod(e.target.value)} />
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
                <ResultCard label={t('maturity_value')} value={formatCurrency(results.futureValue)} isEmphasized />
                <ResultCard label={t('invested_amount')} value={formatCurrency(results.investedAmount)} />
                <ResultCard label={t('estimated_returns')} value={formatCurrency(results.estimatedReturns)} />
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

export default SIPCalculator;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface SalaryToHourlyCalculatorProps {
  calculator: Calculator;
}

const SalaryToHourlyCalculator: React.FC<SalaryToHourlyCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [annualSalary, setAnnualSalary] = useState('75000');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  
  const [results, setResults] = useState<{ hourly: number; weekly: number; monthly: number } | null>(null);

  const handleCalculate = () => {
    const salary = parseFloat(annualSalary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (salary > 0 && hours > 0 && weeks > 0) {
        const hourly = salary / (weeks * hours);
        const weekly = salary / weeks;
        const monthly = salary / 12;
        setResults({ hourly, weekly, monthly });
    }
  };

  const handleReset = () => {
    setAnnualSalary('75000');
    setHoursPerWeek('40');
    setWeeksPerYear('52');
    setResults(null);
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
          <Input label={t('annual_salary')} id="annualSalary" type="number" value={annualSalary} onChange={e => setAnnualSalary(e.target.value)} />
          <Input label={t('hours_per_week')} id="hoursPerWeek" type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} />
          <Input label={t('weeks_per_year')} id="weeksPerYear" type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} />
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
                <ResultCard label={t('hourly_wage')} value={formatCurrency(results.hourly)} isEmphasized />
                <ResultCard label={t('weekly_wage')} value={formatCurrency(results.weekly)} />
                <ResultCard label={t('monthly_wage')} value={formatCurrency(results.monthly)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryToHourlyCalculator;

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BudgetPlannerCalculatorProps {
  calculator: Calculator;
}

interface Item {
    id: number;
    name: string;
    value: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

const BudgetPlannerCalculator: React.FC<BudgetPlannerCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [incomes, setIncomes] = useState<Item[]>([
      { id: 1, name: 'Monthly Salary', value: '4000' },
  ]);
  const [expenses, setExpenses] = useState<Item[]>([
      { id: 1, name: 'Rent/Mortgage', value: '1500' },
      { id: 2, name: 'Groceries', value: '400' },
      { id: 3, name: 'Transportation', value: '150' },
  ]);

   const handleItemChange = (type: 'income' | 'expense', index: number, field: 'name' | 'value', fieldValue: string) => {
    if (type === 'income') {
        const newItems = [...incomes];
        newItems[index] = { ...newItems[index], [field]: fieldValue };
        setIncomes(newItems);
    } else {
        const newItems = [...expenses];
        newItems[index] = { ...newItems[index], [field]: fieldValue };
        setExpenses(newItems);
    }
  };

  const addItem = (type: 'income' | 'expense') => {
      const newItem = { id: Date.now(), name: '', value: '' };
      if (type === 'income') setIncomes([...incomes, newItem]);
      else setExpenses([...expenses, newItem]);
  }

  const removeItem = (type: 'income' | 'expense', index: number) => {
      if (type === 'income') setIncomes(incomes.filter((_, i) => i !== index));
      else setExpenses(expenses.filter((_, i) => i !== index));
  }
  
  const totalIncome = useMemo(() => incomes.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0), [incomes]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0), [expenses]);
  const netSavings = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

  const chartData = useMemo(() => expenses
    .filter(e => parseFloat(e.value) > 0)
    .map(e => ({ name: e.name, value: parseFloat(e.value) })), [expenses]);

  return (
    <div>
      <Link to={`/${language}/hub`} className="text-brand-accent hover:underline mb-6 inline-block">&larr; {t('go_back')}</Link>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t(calculator.titleKey)}</h1>
        <p className="text-brand-subtext">{t(calculator.descriptionKey)}</p>
      </div>

      <div className="bg-brand-secondary p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">{t('results')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultCard label={t('net_savings')} value={formatCurrency(netSavings)} isEmphasized />
              <ResultCard label={t('total_income')} value={formatCurrency(totalIncome)} />
              <ResultCard label={t('total_expenses')} value={formatCurrency(totalExpenses)} />
          </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Income Column */}
          <div className="bg-brand-secondary p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-green-400">{t('income')}</h3>
              {incomes.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                      <input type="text" placeholder={t('source_name')} value={item.name} onChange={(e) => handleItemChange('income', index, 'name', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                      <input type="number" placeholder={t('amount')} value={item.value} onChange={(e) => handleItemChange('income', index, 'value', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                      <button onClick={() => removeItem('income', index)} className="text-red-500 p-2">&times;</button>
                  </div>
              ))}
              <Button onClick={() => addItem('income')} variant="secondary">{t('add_income')}</Button>
          </div>

          {/* Expenses Column */}
          <div className="bg-brand-secondary p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-red-400">{t('expenses')}</h3>
              {expenses.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                      <input type="text" placeholder={t('category_name')} value={item.name} onChange={(e) => handleItemChange('expense', index, 'name', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                      <input type="number" placeholder={t('amount')} value={item.value} onChange={(e) => handleItemChange('expense', index, 'value', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                      <button onClick={() => removeItem('expense', index)} className="text-red-500 p-2">&times;</button>
                  </div>
              ))}
              <Button onClick={() => addItem('expense')} variant="secondary">{t('add_expense')}</Button>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-brand-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">{t('expenses')}</h3>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            // FIX: The `percent` prop from recharts can be undefined. Handle this case to prevent a TypeScript error.
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlannerCalculator;
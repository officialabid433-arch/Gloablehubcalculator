import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/ui/Button';
import ResultCard from '../components/ui/ResultCard';

interface NetWorthCalculatorProps {
  calculator: Calculator;
}

interface Item {
    id: number;
    name: string;
    value: string;
}

const NetWorthCalculator: React.FC<NetWorthCalculatorProps> = ({ calculator }) => {
  const { language } = useLanguage();
  const t = useTranslations();

  const [assets, setAssets] = useState<Item[]>([
      { id: 1, name: 'Checking Account', value: '5000' },
      { id: 2, name: 'Home Value', value: '300000' },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
      { id: 1, name: 'Mortgage', value: '250000' },
      { id: 2, name: 'Credit Card Debt', value: '3000' },
  ]);

  const handleItemChange = (type: 'asset' | 'liability', index: number, field: 'name' | 'value', fieldValue: string) => {
    if (type === 'asset') {
        const newAssets = [...assets];
        newAssets[index] = { ...newAssets[index], [field]: fieldValue };
        setAssets(newAssets);
    } else {
        const newLiabilities = [...liabilities];
        newLiabilities[index] = { ...newLiabilities[index], [field]: fieldValue };
        setLiabilities(newLiabilities);
    }
  };

  const addItem = (type: 'asset' | 'liability') => {
      const newItem = { id: Date.now(), name: '', value: '' };
      if (type === 'asset') setAssets([...assets, newItem]);
      else setLiabilities([...liabilities, newItem]);
  }

  const removeItem = (type: 'asset' | 'liability', index: number) => {
      if (type === 'asset') setAssets(assets.filter((_, i) => i !== index));
      else setLiabilities(liabilities.filter((_, i) => i !== index));
  }

  const totalAssets = useMemo(() => assets.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0), [assets]);
  const totalLiabilities = useMemo(() => liabilities.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0), [liabilities]);
  const netWorth = useMemo(() => totalAssets - totalLiabilities, [totalAssets, totalLiabilities]);
  
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
                <ResultCard label={t('net_worth')} value={formatCurrency(netWorth)} isEmphasized />
                <ResultCard label={t('total_assets')} value={formatCurrency(totalAssets)} />
                <ResultCard label={t('total_liabilities')} value={formatCurrency(totalLiabilities)} />
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Assets Column */}
        <div className="bg-brand-secondary p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-green-400">{t('assets')}</h3>
            {assets.map((asset, index) => (
                <div key={asset.id} className="flex items-center space-x-2">
                    <input type="text" placeholder={t('asset_name')} value={asset.name} onChange={(e) => handleItemChange('asset', index, 'name', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                    <input type="number" placeholder={t('amount')} value={asset.value} onChange={(e) => handleItemChange('asset', index, 'value', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                    <button onClick={() => removeItem('asset', index)} className="text-red-500 p-2">&times;</button>
                </div>
            ))}
            <Button onClick={() => addItem('asset')} variant="secondary">{t('add_asset')}</Button>
        </div>

        {/* Liabilities Column */}
        <div className="bg-brand-secondary p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-red-400">{t('liabilities')}</h3>
            {liabilities.map((liability, index) => (
                <div key={liability.id} className="flex items-center space-x-2">
                    <input type="text" placeholder={t('liability_name')} value={liability.name} onChange={(e) => handleItemChange('liability', index, 'name', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                    <input type="number" placeholder={t('amount')} value={liability.value} onChange={(e) => handleItemChange('liability', index, 'value', e.target.value)} className="bg-brand-dark border border-gray-600 rounded p-2 w-1/2" />
                    <button onClick={() => removeItem('liability', index)} className="text-red-500 p-2">&times;</button>
                </div>
            ))}
            <Button onClick={() => addItem('liability')} variant="secondary">{t('add_liability')}</Button>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator;

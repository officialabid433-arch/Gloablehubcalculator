
import React from 'react';
import { AmortizationData } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { exportToCsv } from '../utils/csvExporter';
import Button from './ui/Button';

interface AmortizationTableProps {
  data: AmortizationData[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ data }) => {
  const t = useTranslations();

  const handleExport = () => {
    const headers = [
      t('month'),
      t('principal'),
      t('interest'),
      t('total_payment'),
      t('remaining_balance'),
    ];
    exportToCsv("amortization_schedule.csv", data, headers);
  };

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{t('amortization_schedule')}</h3>
        <Button onClick={handleExport} variant="secondary">{t('export_csv')}</Button>
      </div>
      <div className="overflow-x-auto max-h-96 bg-brand-secondary rounded-lg shadow-inner">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-subtext uppercase tracking-wider">{t('month')}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-subtext uppercase tracking-wider">{t('principal')}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-subtext uppercase tracking-wider">{t('interest')}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-subtext uppercase tracking-wider">{t('total_payment')}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-subtext uppercase tracking-wider">{t('remaining_balance')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((row) => (
              <tr key={row.month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.principal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.interest}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.totalPayment}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.remainingBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationTable;

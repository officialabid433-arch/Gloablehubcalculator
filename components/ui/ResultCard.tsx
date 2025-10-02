
import React from 'react';

interface ResultCardProps {
  label: string;
  value: string | number;
  isEmphasized?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, isEmphasized = false }) => {
  const valueClasses = isEmphasized
    ? "text-3xl lg:text-4xl font-bold text-brand-accent"
    : "text-2xl lg:text-3xl font-semibold text-brand-text";

  return (
    <div className="bg-brand-secondary p-4 rounded-lg text-center shadow-md">
      <p className="text-sm text-brand-subtext mb-1">{label}</p>
      <p className={valueClasses}>{value}</p>
    </div>
  );
};

export default ResultCard;

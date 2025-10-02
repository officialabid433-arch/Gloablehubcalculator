
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-brand-subtext">
        {label}
      </label>
      <input
        id={id}
        className="bg-brand-dark border border-gray-600 text-brand-text text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block w-full p-3"
        {...props}
      />
    </div>
  );
};

export default Input;


import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-brand-secondary mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-brand-subtext">
        <p>&copy; {currentYear} Global Finance Calculator Hub. All rights reserved.</p>
        <p className="text-sm mt-2">Created by Muhammad Abid Nawaz (Abid Official)</p>
      </div>
    </footer>
  );
};

export default Footer;

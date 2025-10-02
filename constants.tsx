import React from 'react';
import { Calculator } from './types';

// Icons
const LoanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const CompoundInterestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CurrencyConverterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const SavingsGoalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const RetirementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m-4-4H7m0 4h1m8-4h-1m0 4h-1m-4-4h.01M12 12h.01M12 12v.01M12 12l.01.01M12 12l-.01.01m.01-.01l.01-.01m-.01.01l-.01-.01M7 16h1m8-4h1m-1 4h1m-4 4h1m4 0h1m-4-4h1m-4-4h1m4 0h1m-8 4h1m-4 0h1m4 4h1m0 0h-1" /></svg>;
const ROIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;
const ProfitMarginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 0V5m0 3v2m0-2h.01M6 12a6 6 0 1112 0A6 6 0 016 12z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BreakEvenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 6h12l3-6H3zm16 12a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const CAGRIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>;
const InflationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4a2 2 0 114 0v1m-4-1a2 2 0 10-4 0v1m4-1h.01M12 15h.01M8 12h.01M16 12h.01" /></svg>;
const IncomeTaxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const VATGSTIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h4m5 6H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>;
const StudentLoanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const SalaryToHourlyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DebtPayoffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const NetWorthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l-6-2m6 2l3 1m-3-1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M9 18l6 0" /></svg>;
const BudgetPlannerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
const CurrencyInflationAdjustedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0V6m0 12v-2m4-4h2M6 12H4m11.66-5.66l1.42-1.42M6.34 17.66l-1.42 1.42" /></svg>;

// New Icons
const EMIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;
const SimpleInterestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM17 21v-1.5a4.5 4.5 0 00-4.5-4.5H12a4.5 4.5 0 00-4.5 4.5V21M3 3h2m2 0h2m2 0h2m2 0h2m2 0h2" /></svg>;
const SIPIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const FDIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>;
const RDIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 9h6v6H9z" /></svg>;

export const CALCULATORS: Calculator[] = [
  // New Calculators
  {
    id: 'emi-loan',
    titleKey: 'emi_title',
    descriptionKey: 'emi_desc',
    path: '/emi-loan',
    icon: <EMIIcon />,
  },
  {
    id: 'simple-interest',
    titleKey: 'simple_interest_title',
    descriptionKey: 'simple_interest_desc',
    path: '/simple-interest',
    icon: <SimpleInterestIcon />,
  },
  {
    id: 'sip',
    titleKey: 'sip_title',
    descriptionKey: 'sip_desc',
    path: '/sip',
    icon: <SIPIcon />,
  },
  {
    id: 'fd',
    titleKey: 'fd_title',
    descriptionKey: 'fd_desc',
    path: '/fd',
    icon: <FDIcon />,
  },
  {
    id: 'rd',
    titleKey: 'rd_title',
    descriptionKey: 'rd_desc',
    path: '/rd',
    icon: <RDIcon />,
  },
  // Phase 1
  {
    id: 'loan-mortgage',
    titleKey: 'loan_title',
    descriptionKey: 'loan_desc',
    path: '/loan-mortgage',
    icon: <LoanIcon />,
  },
  {
    id: 'compound-interest',
    titleKey: 'compound_title',
    descriptionKey: 'compound_desc',
    path: '/compound-interest',
    icon: <CompoundInterestIcon />,
  },
  {
    id: 'currency-converter',
    titleKey: 'currency_title',
    descriptionKey: 'currency_desc',
    path: '/currency-converter',
    icon: <CurrencyConverterIcon />,
  },
  {
    id: 'savings-goal',
    titleKey: 'savings_title',
    descriptionKey: 'savings_desc',
    path: '/savings-goal',
    icon: <SavingsGoalIcon />,
  },
  {
    id: 'retirement',
    titleKey: 'retirement_title',
    descriptionKey: 'retirement_desc',
    path: '/retirement',
    icon: <RetirementIcon />,
  },
  // Phase 2
  {
    id: 'roi',
    titleKey: 'roi_title',
    descriptionKey: 'roi_desc',
    path: '/roi',
    icon: <ROIIcon />,
  },
  {
    id: 'profit-margin',
    titleKey: 'profit_margin_title',
    descriptionKey: 'profit_margin_desc',
    path: '/profit-margin',
    icon: <ProfitMarginIcon />,
  },
  {
    id: 'break-even',
    titleKey: 'break_even_title',
    descriptionKey: 'break_even_desc',
    path: '/break-even',
    icon: <BreakEvenIcon />,
  },
  {
    id: 'cagr',
    titleKey: 'cagr_title',
    descriptionKey: 'cagr_desc',
    path: '/cagr',
    icon: <CAGRIcon />,
  },
  {
    id: 'inflation',
    titleKey: 'inflation_title',
    descriptionKey: 'inflation_desc',
    path: '/inflation',
    icon: <InflationIcon />,
  },
  // Phase 3
  {
    id: 'income-tax',
    titleKey: 'income_tax_title',
    descriptionKey: 'income_tax_desc',
    path: '/income-tax',
    icon: <IncomeTaxIcon />,
  },
  {
    id: 'vat',
    titleKey: 'vat_title',
    descriptionKey: 'vat_desc',
    path: '/vat',
    icon: <VATGSTIcon />,
  },
  {
    id: 'gst',
    titleKey: 'gst_title',
    descriptionKey: 'gst_desc',
    path: '/gst',
    icon: <VATGSTIcon />,
  },
  {
    id: 'student-loan',
    titleKey: 'student_loan_title',
    descriptionKey: 'student_loan_desc',
    path: '/student-loan',
    icon: <StudentLoanIcon />,
  },
  {
    id: 'salary-to-hourly',
    titleKey: 'salary_title',
    descriptionKey: 'salary_desc',
    path: '/salary-to-hourly',
    icon: <SalaryToHourlyIcon />,
  },
  // Phase 4
  {
    id: 'debt-payoff',
    titleKey: 'debt_payoff_title',
    descriptionKey: 'debt_payoff_desc',
    path: '/debt-payoff',
    icon: <DebtPayoffIcon />,
  },
  {
    id: 'credit-card-interest',
    titleKey: 'credit_card_title',
    descriptionKey: 'credit_card_desc',
    path: '/credit-card-interest',
    icon: <CreditCardIcon />,
  },
  {
    id: 'net-worth',
    titleKey: 'net_worth_title',
    descriptionKey: 'net_worth_desc',
    path: '/net-worth',
    icon: <NetWorthIcon />,
  },
  {
    id: 'budget-planner',
    titleKey: 'budget_planner_title',
    descriptionKey: 'budget_planner_desc',
    path: '/budget-planner',
    icon: <BudgetPlannerIcon />,
  },
  {
    id: 'currency-inflation-adjusted',
    titleKey: 'currency_inflation_title',
    descriptionKey: 'currency_inflation_desc',
    path: '/currency-inflation-adjusted',
    icon: <CurrencyInflationAdjustedIcon />,
  },
];

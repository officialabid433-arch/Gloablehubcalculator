import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hub from './pages/Hub';
import LoanCalculator from './pages/LoanCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import CurrencyConverter from './pages/CurrencyConverter';
import SavingsGoalCalculator from './pages/SavingsGoalCalculator';
import RetirementCalculator from './pages/RetirementCalculator';
import NotFound from './pages/NotFound';
import { CALCULATORS } from './constants';
import ROICalculator from './pages/ROICalculator';
import ProfitMarginCalculator from './pages/ProfitMarginCalculator';
import BreakEvenCalculator from './pages/BreakEvenCalculator';
import CAGRCalculator from './pages/CAGRCalculator';
import InflationCalculator from './pages/InflationCalculator';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import VATCalculator from './pages/VATCalculator';
import GSTCalculator from './pages/GSTCalculator';
import StudentLoanCalculator from './pages/StudentLoanCalculator';
import SalaryToHourlyCalculator from './pages/SalaryToHourlyCalculator';
import DebtPayoffCalculator from './pages/DebtPayoffCalculator';
import CreditCardInterestCalculator from './pages/CreditCardInterestCalculator';
import NetWorthCalculator from './pages/NetWorthCalculator';
import BudgetPlannerCalculator from './pages/BudgetPlannerCalculator';
import CurrencyInflationAdjustedValueCalculator from './pages/CurrencyInflationAdjustedValueCalculator';
import EMICalculator from './pages/EMICalculator';
import SimpleInterestCalculator from './pages/SimpleInterestCalculator';
import SIPCalculator from './pages/SIPCalculator';
import FDCalculator from './pages/FDCalculator';
import RDCalculator from './pages/RDCalculator';

const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen bg-brand-dark text-brand-text font-sans">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Hub />} />
              <Route path="/:lang" element={<Navigate to=":lang/hub" replace />} />
              <Route path="/:lang/hub" element={<Hub />} />

              {/* New Calculators */}
              <Route path="/:lang/emi-loan" element={<EMICalculator calculator={CALCULATORS[0]} />} />
              <Route path="/:lang/simple-interest" element={<SimpleInterestCalculator calculator={CALCULATORS[1]} />} />
              <Route path="/:lang/sip" element={<SIPCalculator calculator={CALCULATORS[2]} />} />
              <Route path="/:lang/fd" element={<FDCalculator calculator={CALCULATORS[3]} />} />
              <Route path="/:lang/rd" element={<RDCalculator calculator={CALCULATORS[4]} />} />
              
              {/* Phase 1 */}
              <Route path="/:lang/loan-mortgage" element={<LoanCalculator calculator={CALCULATORS[5]} />} />
              <Route path="/:lang/compound-interest" element={<CompoundInterestCalculator calculator={CALCULATORS[6]} />} />
              <Route path="/:lang/currency-converter" element={<CurrencyConverter calculator={CALCULATORS[7]} />} />
              <Route path="/:lang/savings-goal" element={<SavingsGoalCalculator calculator={CALCULATORS[8]} />} />
              <Route path="/:lang/retirement" element={<RetirementCalculator calculator={CALCULATORS[9]} />} />
              {/* Phase 2 */}
              <Route path="/:lang/roi" element={<ROICalculator calculator={CALCULATORS[10]} />} />
              <Route path="/:lang/profit-margin" element={<ProfitMarginCalculator calculator={CALCULATORS[11]} />} />
              <Route path="/:lang/break-even" element={<BreakEvenCalculator calculator={CALCULATORS[12]} />} />
              <Route path="/:lang/cagr" element={<CAGRCalculator calculator={CALCULATORS[13]} />} />
              <Route path="/:lang/inflation" element={<InflationCalculator calculator={CALCULATORS[14]} />} />
              {/* Phase 3 */}
              <Route path="/:lang/income-tax" element={<IncomeTaxCalculator calculator={CALCULATORS[15]} />} />
              <Route path="/:lang/vat" element={<VATCalculator calculator={CALCULATORS[16]} />} />
              <Route path="/:lang/gst" element={<GSTCalculator calculator={CALCULATORS[17]} />} />
              <Route path="/:lang/student-loan" element={<StudentLoanCalculator calculator={CALCULATORS[18]} />} />
              <Route path="/:lang/salary-to-hourly" element={<SalaryToHourlyCalculator calculator={CALCULATORS[19]} />} />
              {/* Phase 4 */}
              <Route path="/:lang/debt-payoff" element={<DebtPayoffCalculator calculator={CALCULATORS[20]} />} />
              <Route path="/:lang/credit-card-interest" element={<CreditCardInterestCalculator calculator={CALCULATORS[21]} />} />
              <Route path="/:lang/net-worth" element={<NetWorthCalculator calculator={CALCULATORS[22]} />} />
              <Route path="/:lang/budget-planner" element={<BudgetPlannerCalculator calculator={CALCULATORS[23]} />} />
              <Route path="/:lang/currency-inflation-adjusted" element={<CurrencyInflationAdjustedValueCalculator calculator={CALCULATORS[24]} />} />


              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;

export interface TaxBracket {
  rate: number;
  min: number;
  max?: number;
}

export interface TaxData {
  [country: string]: TaxBracket[];
}

// NOTE: These are simplified 2024 tax brackets for demonstration purposes only.
// They do not account for deductions, credits, or different filing statuses.
const mockTaxData: TaxData = {
  'USA': [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350 },
  ],
  'UK': [
    { rate: 0.0, min: 0, max: 12570 }, // Personal Allowance
    { rate: 0.20, min: 12570, max: 50270 },
    { rate: 0.40, min: 50270, max: 125140 },
    { rate: 0.45, min: 125140 },
  ],
  'CA': [ // Federal brackets
    { rate: 0.15, min: 0, max: 55867 },
    { rate: 0.205, min: 55867, max: 111733 },
    { rate: 0.26, min: 111733, max: 173205 },
    { rate: 0.29, min: 173205, max: 246752 },
    { rate: 0.33, min: 246752 },
  ],
  'AU': [
    { rate: 0.0, min: 0, max: 18200 },
    { rate: 0.19, min: 18200, max: 45000 },
    { rate: 0.325, min: 45000, max: 120000 },
    { rate: 0.37, min: 120000, max: 180000 },
    { rate: 0.45, min: 180000 },
  ],
};

export const taxCountries = Object.keys(mockTaxData);

export const calculateIncomeTax = async (
  income: number,
  country: string
): Promise<{ totalTax: number; netIncome: number; effectiveRate: number }> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
  
  const brackets = mockTaxData[country];
  if (!brackets) {
    throw new Error('Invalid country selected for tax calculation');
  }

  let totalTax = 0;
  let remainingIncome = income;

  for (const bracket of brackets) {
    if (income > bracket.min) {
      const taxableInBracket = Math.min(
        income - bracket.min,
        (bracket.max || Infinity) - bracket.min
      );
      totalTax += taxableInBracket * bracket.rate;
    }
  }

  const netIncome = income - totalTax;
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

  return { totalTax, netIncome, effectiveRate };
};

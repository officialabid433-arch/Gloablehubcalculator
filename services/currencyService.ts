
// Mock currency conversion rates relative to USD
const mockRates: { [key: string]: number } = {
  'USD': 1.0,
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 157.0,
  'CAD': 1.37,
  'AUD': 1.50,
  'CNY': 7.25,
  'INR': 83.5,
};

export const currencies = Object.keys(mockRates);

export const getConversionRate = async (from: string, to: string): Promise<number> => {
  console.log(`Fetching rate for ${from} to ${to}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const fromRate = mockRates[from];
  const toRate = mockRates[to];

  if (!fromRate || !toRate) {
    throw new Error('Invalid currency code');
  }
  
  // Convert 'from' currency to USD, then USD to 'to' currency
  const rate = toRate / fromRate;

  return rate;
};

export const getLastUpdatedTimestamp = (): string => {
    return new Date().toLocaleString();
}

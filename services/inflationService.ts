// Mock CPI data (base year 2020 = 100)
const mockCpiData: { [country: string]: { [year: number]: number } } = {
  'USA': {
    2020: 100.0,
    2021: 104.7,
    2022: 113.1,
    2023: 116.7,
    2024: 120.2,
  },
  'UK': {
    2020: 100.0,
    2021: 102.5,
    2022: 110.1,
    2023: 114.6,
    2024: 118.0,
  },
  'EU': {
    2020: 100.0,
    2021: 102.6,
    2022: 111.4,
    2023: 115.8,
    2024: 119.3,
  },
};

export const availableCountries = Object.keys(mockCpiData);
export const availableYears = Object.keys(mockCpiData['USA']).map(Number);

export const getInflationAdjustedValue = async (
  initialAmount: number,
  startYear: number,
  endYear: number,
  country: string
): Promise<{ adjustedValue: number; totalInflation: number }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const countryData = mockCpiData[country];
  if (!countryData) {
    throw new Error('Invalid country selected');
  }

  const startCpi = countryData[startYear];
  const endCpi = countryData[endYear];

  if (startCpi === undefined || endCpi === undefined) {
    throw new Error('Invalid year selected');
  }

  const adjustedValue = initialAmount * (endCpi / startCpi);
  const totalInflation = ((endCpi - startCpi) / startCpi) * 100;

  return { adjustedValue, totalInflation };
};
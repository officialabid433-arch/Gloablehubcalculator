export const mockVatRates: { [country: string]: number } = {
    'UK': 20,
    'Germany': 19,
    'France': 20,
    'Ireland': 23,
    'Luxembourg': 17,
    'Spain': 21,
    'Italy': 22,
};

export const mockGstRates: { [country: string]: number } = {
    'Australia': 10,
    'Canada': 5, // Federal GST
    'New Zealand': 15,
    'Singapore': 9,
    'India': 18, // Standard rate
};

export const vatCountries = Object.keys(mockVatRates);
export const gstCountries = Object.keys(mockGstRates);

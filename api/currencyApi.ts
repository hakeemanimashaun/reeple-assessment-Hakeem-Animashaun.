interface FetchExchangeRateResponse {
    result: string;
    conversion_rates: Record<string, number>;
  }
  
  export const fetchExchangeRate = async (
    sourceCurrency: string,
    targetCurrency: string
  ): Promise<{ rates: Record<string, number>; rate: number }> => {
    const API_KEY = 'cd9501a0d146a3c103e510b5';
    const BASE_URL = 'https://v6.exchangerate-api.com/v6';
    
    try {
      const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${sourceCurrency}`);
      const data: FetchExchangeRateResponse = await response.json();
  
      if (data.result === 'success') {
        return {
          rates: data.conversion_rates,
          rate: data.conversion_rates[targetCurrency],
        };
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      throw new Error('Failed to fetch exchange rates. Please try again.');
    }
  };
  
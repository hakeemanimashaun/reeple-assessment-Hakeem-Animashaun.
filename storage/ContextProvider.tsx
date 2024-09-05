// app context provides global state for the application

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  sourceCurrency: string;
  setSourceCurrency: React.Dispatch<React.SetStateAction<string>>;
  rates: { [key: string]: number };
  setRates: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  targetCurrency: string;
  setTargetCurrency: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  convertedAmount: string;
  setConvertedAmount: React.Dispatch<React.SetStateAction<string>>;
  exchangeRate: number | null;
  setExchangeRate: React.Dispatch<React.SetStateAction<number | null>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [sourceCurrency, setSourceCurrency] = useState<string>('USD');
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('0');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        sourceCurrency,
        setSourceCurrency,
        rates,
        setRates,
        targetCurrency,
        setTargetCurrency,
        amount,
        setAmount,
        convertedAmount,
        setConvertedAmount,
        exchangeRate,
        setExchangeRate,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

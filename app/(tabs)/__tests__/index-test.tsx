import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../index'; // Assuming the App component is in the parent directory
import { useAppContext } from '@/storage/ContextProvider';

// Define the types for the CustomPicker props
interface CustomPickerProps {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

// Mock the CustomPicker component with TypeScript typings
jest.mock('@/components/CustomPicker', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  return {
    __esModule: true,
    default: ({ label, options, selectedValue, onValueChange }: CustomPickerProps) => (
      <View>
        <Text>{label}</Text>
        {options.map((option, index) => (
          <Text
            key={option}
            testID={`currency-${option}-${index}`}
            onPress={() => onValueChange(option)}
          >
            {option}
          </Text>
        ))}
      </View>
    ),
  };
});

// Mock the useAppContext to avoid side effects
jest.mock('@/storage/ContextProvider', () => ({
  useAppContext: jest.fn(),
}));

describe('Currency Converter App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const mockContext = {
      sourceCurrency: 'USD',
      setSourceCurrency: jest.fn(),
      targetCurrency: 'EUR',
      setTargetCurrency: jest.fn(),
      amount: '100',
      setAmount: jest.fn(),
      convertedAmount: '90.00',
      setConvertedAmount: jest.fn(),
      exchangeRate: 0.9,
      setExchangeRate: jest.fn(),
      error: '',
      setError: jest.fn(),
      rates: {},
      setRates: jest.fn(),
    };

    (useAppContext as jest.Mock).mockReturnValue(mockContext);

    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText('Currency Converter')).toBeTruthy();
    expect(getByPlaceholderText('Enter amount')).toBeTruthy();
    expect(getByText('From')).toBeTruthy();
    expect(getByText('To')).toBeTruthy();
    expect(getByText('100 USD = 90.00 EUR')).toBeTruthy();
  });

  it('handles API errors', async () => {
    const mockContext = {
      sourceCurrency: 'USD',
      setSourceCurrency: jest.fn(),
      targetCurrency: 'EUR',
      setTargetCurrency: jest.fn(),
      amount: '100',
      setAmount: jest.fn(),
      convertedAmount: '',
      setConvertedAmount: jest.fn(),
      exchangeRate: null,
      setExchangeRate: jest.fn(),
      error: 'Network error',
      setError: jest.fn(),
      rates: {},
      setRates: jest.fn(),
    };

    (useAppContext as jest.Mock).mockReturnValue(mockContext);

    const { getByText } = render(<App />);

    expect(getByText('Network error')).toBeTruthy();
  });
});

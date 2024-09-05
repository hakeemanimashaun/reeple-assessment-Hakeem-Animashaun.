import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../explore'; // Adjust the path according to your project structure
import { useAppContext } from '@/storage/ContextProvider';

// Mock the useAppContext hook
jest.mock('@/storage/ContextProvider', () => ({
  useAppContext: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and displays the title', () => {
    // Provide default mock context
    (useAppContext as jest.Mock).mockReturnValue({
      rates: {},
      error: '',
    });

    const { getByText } = render(<App />);

    expect(getByText('Currency Rate List')).toBeTruthy();
  });

  it('displays an error message when there is an error', () => {
    // Provide mock context with error
    (useAppContext as jest.Mock).mockReturnValue({
      rates: {},
      error: 'Network error',
    });

    const { getByText } = render(<App />);

    expect(getByText('Network error')).toBeTruthy();
  });

  it('displays a list of currency rates when there are no errors', () => {
    // Provide mock context with some rates
    (useAppContext as jest.Mock).mockReturnValue({
      rates: {
        USD: 1.0,
        EUR: 0.9,
        GBP: 0.75,
      },
      error: '',
    });

    const { getByText } = render(<App />);

    expect(getByText('USD')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('EUR')).toBeTruthy();
    expect(getByText('0.9')).toBeTruthy();
    expect(getByText('GBP')).toBeTruthy();
    expect(getByText('0.75')).toBeTruthy();
  });
});

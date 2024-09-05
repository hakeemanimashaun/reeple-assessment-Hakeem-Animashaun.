// CustomPicker.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomPicker from '../CustomPicker';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'), 
}));

describe('CustomPicker', () => {
  const mockOnValueChange = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <CustomPicker
        label="Select an option"
        options={['Option 1', 'Option 2']}
        selectedValue="Option 1"
        onValueChange={mockOnValueChange}
      />
    );

    expect(getByText('Select an option')).toBeTruthy();
    expect(getByText('Option 1')).toBeTruthy();
  });

  

});

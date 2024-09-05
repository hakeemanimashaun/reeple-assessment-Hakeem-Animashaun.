// ThemedTextInput.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemedTextInput } from '../ThemedInput';
import { useThemeColor } from '@/hooks/useThemeColor';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'), // Replace with default color for testing
}));

describe('ThemedTextInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <ThemedTextInput
        placeholder="Enter text"
        value=""
        onChangeText={() => {}}
      />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('changes border color on focus', () => {
    const { getByPlaceholderText } = render(
      <ThemedTextInput
        placeholder="Enter text"
        value=""
        onChangeText={() => {}}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    
    fireEvent(input, 'focus');
    expect(input.props.style[1].borderColor).toBe('blue'); // Assuming blue is the focused color

    fireEvent(input, 'blur');
    expect(input.props.style[1].borderColor).toBe('#000000'); // Default color
  });
});

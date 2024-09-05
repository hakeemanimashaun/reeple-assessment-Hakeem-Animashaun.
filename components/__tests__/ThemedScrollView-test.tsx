// ThemedScrollView.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedScrollView } from '../ThemedScrollView';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#FFFFFF'), // Default background color
}));

describe('ThemedScrollView', () => {
  it('renders correctly with the background color', () => {
    const { getByTestId } = render(
      <ThemedScrollView testID="scrollView" style={{ height: 100 }}>
        <></>
      </ThemedScrollView>
    );
    const scrollView = getByTestId('scrollView');
    expect(scrollView.props.style[0].backgroundColor).toBe('#FFFFFF'); // Theme color
  });
});

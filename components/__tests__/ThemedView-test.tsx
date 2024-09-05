
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView } from '../ThemedView';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#FFFFFF'), // Default background color
}));

describe('ThemedView', () => {
  it('renders correctly with the background color', () => {
    const { getByTestId } = render(
      <ThemedView testID="view" style={{ height: 100 }}>
        <></>
      </ThemedView>
    );
    const view = getByTestId('view');
    expect(view.props.style[0].backgroundColor).toBe('#FFFFFF'); // Theme color
  });
});

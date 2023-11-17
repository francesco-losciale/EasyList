import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ListView from '../src/ListView';

it('renders correctly', () => {
  render(<ListView />);

  expect(screen.getByPlaceholderText('Insert text here')).toBeTruthy();
  expect(screen.getByRole('button', {name: 'Add'})).toBeTruthy()
});

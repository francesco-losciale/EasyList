import React from 'react';
import {render, screen, userEvent} from '@testing-library/react-native';
import ListView from '../src/ListView';

it('renders correctly', () => {
  render(<ListView />);

  expect(screen.getByPlaceholderText('Insert text here')).toBeTruthy();
  expect(screen.getByTestId('button-add-item')).toBeTruthy();
});

it('can add item to list', async () => {
  render(<ListView />);
  const textInput = screen.getByPlaceholderText('Insert text here');
  const addButton = screen.getByTestId('button-add-item');
  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

  await user.type(textInput, 'new item');
  await user.press(addButton);

  expect(await screen.findByText('new item'));
  expect(textInput).toHaveTextContent('')
});

it('can mark item in the list by tapping on it', async () => {
  render(<ListView />);
  const textInput = screen.getByPlaceholderText('Insert text here');
  const addButton = screen.getByTestId('button-add-item');
  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
  await user.type(textInput, 'new item');
  await user.press(addButton);
  const itemOnList = await screen.findByText('new item')

  await user.press(itemOnList)

  expect(itemOnList.props.style.textDecorationLine).toContain('line-through')
});

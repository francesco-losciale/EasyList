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

it('items marked as done are at the bottom', async () => {
  render(<ListView />);
  const textInput = screen.getByPlaceholderText('Insert text here');
  const addButton = screen.getByTestId('button-add-item');
  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

  await user.type(textInput, 'new item 1');
  await user.press(addButton);
  await user.type(textInput, 'new item 2');
  await user.press(addButton);
  await user.type(textInput, 'new item 3');
  await user.press(addButton);

  const itemOnList = await screen.findByText('new item 1')
  await user.press(itemOnList)

  const items = await screen.findAllByRole('text')
  expect(items).toHaveLength(3)
  expect(items[0]).toHaveTextContent('new item 2')
  expect(items[1]).toHaveTextContent('new item 3')
  expect(items[2]).toHaveTextContent('new item 1')
});

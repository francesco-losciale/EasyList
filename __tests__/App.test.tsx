import React from 'react';
import App from '../src/App';
import {render, screen, userEvent} from "@testing-library/react-native";

it('renders correctly', () => {
  render(<App/>);

  expect(screen.getByText('Create')).toBeOnTheScreen();
});

it('can navigate from home view to list view', async () => {
  render(<App/>);
  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

  const button = await screen.findByTestId('button-create-list')
  await user.press(button)

  expect(screen.getByText('Add')).toBeOnTheScreen();
});

it('can navigate back to home page after clicking save', async () => {
  render(<App/>);
  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
  const button = await screen.findByTestId('button-create-list')
  await user.press(button)

  const saveButton = await screen.findByTestId('button-save-list-item')
  await user.press(saveButton)

  expect(screen.getByText('Create')).toBeOnTheScreen();
});



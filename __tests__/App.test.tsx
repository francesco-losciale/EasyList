import React from 'react';
import App from '../src/App';
import {render, screen, userEvent, waitFor} from "@testing-library/react-native";

describe('App', () => {

  it('renders correctly', () => {
    render(<App/>);

    expect(screen.getByText('Create')).toBeOnTheScreen();
  });

  it('can navigate from home view to list view', async () => {
    render(<App/>);
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

    const createListButton = await screen.findByTestId('button-create-list')
    await user.press(createListButton)

    expect(screen.getByText('Add')).toBeOnTheScreen();
  });

  it('can navigate back to home page after clicking save', async () => {
    render(<App/>);
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const createListButton = await screen.findByTestId('button-create-list')
    await user.press(createListButton)

    const saveButton = await screen.findByTestId('button-save-list-item')
    await user.press(saveButton)

    expect(screen.getByText('Create')).toBeOnTheScreen();
  });

  it('can create a list and view it', async () => {
    render(<App/>);
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const createListButton = await screen.findByTestId('button-create-list')
    await user.press(createListButton)
    const textInput = screen.getByPlaceholderText('Insert text here');
    await user.type(textInput, 'item of the list')
    const addItemButton = await screen.findByTestId('button-add-item')
    await user.press(addItemButton)
    const saveButton = await screen.findByTestId('button-save-list-item')
    await user.press(saveButton)
    expect(screen.getByText('Create')).toBeOnTheScreen();

    const firstList = (await screen.findAllByRole('text'))[0]
    await user.press(firstList)

    expect(await screen.findByText('item of the list')).toBeOnTheScreen()
  });

})



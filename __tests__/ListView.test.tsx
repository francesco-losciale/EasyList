import React from 'react';
import {render, screen, userEvent} from '@testing-library/react-native';
import ListView from '../src/ListView';
import {TodoListsStore, TodoListsStoreProvider} from "../src/shared/stores/todoListsStore";

describe('List of items', () => {

  const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});

  it('renders correctly', () => {
    const todoStore = TodoListsStore.create()
    render(
      <TodoListsStoreProvider value={todoStore}>
        <ListView/>
      </TodoListsStoreProvider>
    );

    expect(screen.getByPlaceholderText('Insert text here')).toBeTruthy();
    expect(screen.getByTestId('button-add-item')).toBeTruthy();
  });

  it('can add item to list', async () => {
    const todoStore = TodoListsStore.create()
    render(
      <TodoListsStoreProvider value={todoStore}>
        <ListView/>
      </TodoListsStoreProvider>
    );
    const textInput = screen.getByPlaceholderText('Insert text here');

    await addItem('new item')

    expect(await screen.findByText('new item'));
    expect(textInput).toHaveTextContent('')
  });

  it('can mark item in the list by tapping on it', async () => {
    const todoStore = TodoListsStore.create()
    render(
      <TodoListsStoreProvider value={todoStore}>
        <ListView/>
      </TodoListsStoreProvider>
    );
    await addItem('new item')
    const itemOnList = await screen.findByText('new item')

    await user.press(itemOnList)

    expect(itemOnList.props.style.textDecorationLine).toContain('line-through')
  });

  it('items marked as done are at the bottom', async () => {
    const todoStore = TodoListsStore.create()
    render(
      <TodoListsStoreProvider value={todoStore}>
        <ListView/>
      </TodoListsStoreProvider>
    );
    await addItem('new item 1');
    await addItem('new item 2');
    await addItem('new item 3');

    const itemOnList = await screen.findByText('new item 1')
    await user.press(itemOnList)

    const items = await screen.findAllByRole('text')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('new item 2')
    expect(items[1]).toHaveTextContent('new item 3')
    expect(items[2]).toHaveTextContent('new item 1')
  });

  it('can save the list', async () => {
    const todoStore = TodoListsStore.create()
    render(
        <TodoListsStoreProvider value={todoStore}>
          <ListView/>
        </TodoListsStoreProvider>
    );
    await addItem('new item 4');
    await addItem('new item 5');
    await addItem('new item 6');
    const saveListButton = screen.getByTestId('button-save-list-item');

    await user.press(saveListButton)

    expect(todoStore.todoLists).toHaveLength(1)
    expect(todoStore.todoLists[0]).toBeTruthy()
    expect(todoStore.todoLists[0].getTodos).toHaveLength(3)
    expect(todoStore.todoLists[0].getTodos[0].title).toBe('new item 4')
    expect(todoStore.todoLists[0].getTodos[1].title).toBe('new item 5')
    expect(todoStore.todoLists[0].getTodos[2].title).toBe('new item 6')
  })

  const addItem = async (text: string) => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    const textInput = screen.getByPlaceholderText('Insert text here');
    const addButton = screen.getByTestId('button-add-item');

    await user.type(textInput, text);
    await user.press(addButton);
  }

})

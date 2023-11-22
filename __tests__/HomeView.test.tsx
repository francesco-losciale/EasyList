import {render, screen, userEvent} from "@testing-library/react-native";
import {TodoListsStore, TodoListsStoreProvider} from "../src/shared/stores/todoListsStore";
import React from "react";
import HomeView from "../src/HomeView";

describe('Home view', () => {

  it('renders correctly', async () => {
    renderHomeView()

    const lists = await screen.findAllByRole('text')
    expect(lists).toHaveLength(1)
  });

  const renderHomeView = () => {
    const todoStore = TodoListsStore.create()
    todoStore.addItemToCurrentList('test 1')
    todoStore.addItemToCurrentList('test 2')
    todoStore.saveCurrentList()
    const props: any = {
      navigation: {
        navigate: jest.fn()
      },
    }
    render(
      <TodoListsStoreProvider value={todoStore}>
        <HomeView {...props} />
      </TodoListsStoreProvider>
    );
    return {todoStore}
  }
})

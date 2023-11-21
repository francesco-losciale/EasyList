import {render, screen} from "@testing-library/react-native";
import {TodoListsStore, TodoListsStoreProvider} from "../src/shared/stores/todoListsStore";
import React from "react";
import HomeView from "../src/HomeView";

describe('Home view', () => {

  const renderWithStore = () => {
    const todoStore = TodoListsStore.create()
    todoStore.addItemToCurrentList('test 1')
    todoStore.addItemToCurrentList('test 2')
    todoStore.saveCurrentList()
    render(
      <TodoListsStoreProvider value={todoStore}>
        <HomeView/>
      </TodoListsStoreProvider>
    );
    return {todoStore}
  }

  it('renders correctly', async () => {
    renderWithStore()

    const lists = await screen.findAllByRole('text')
    expect(lists).toHaveLength(1)
  });

})

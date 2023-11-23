import {render, screen, userEvent, waitFor} from "@testing-library/react-native";
import {TodoLists, TodoListsStore, TodoListsStoreProvider} from "../src/shared/stores/todoListsStore";
import React from "react";
import HomeView from "../src/HomeView";

describe('Home view', () => {

  it('renders list of lists', async () => {
    const todoStore = createTodoStore()
    renderHomeView({todoStore})
    const listId = todoStore.todoLists[0].id

    expect(await screen.findByText(listId)).toBeOnTheScreen()
  });

  const createTodoStore = () => {
    const todoStore = TodoListsStore.create()
    todoStore.addItemToCurrentList('text')
    todoStore.saveCurrentList()
    return todoStore
  }

  const renderHomeView = ({todoStore} : {todoStore: TodoLists}) => {
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

import React from 'react';
import {Instance, types} from 'mobx-state-tree';
import {v4 as uuidv4} from "uuid";

const Todo = types
  .model({
    title: types.string,
    isDone: types.boolean,
    id: types.string,
  })
  .actions((self) => ({
    toggle() {
      self.isDone = true
    }
  }))

const TodoList = types
  .model({
    id: types.identifier,
    todos: types.array(Todo),
  })
  .views((self) => ({
    get getTodos() {
      return self.todos.filter(item => !item.isDone).concat(
        self.todos.filter(item => item.isDone)
      )
    }
  }))
  .actions((self) => ({
    addTodo(text: string) {
      self.todos.replace([...self.todos, Todo.create({
        id: uuidv4(),
        title: text,
        isDone: false
      })])
    },
  }))

export const TodoListsStore = types
  .model({
    lists: types.array(TodoList),
    selectedList: types.maybeNull(types.reference(TodoList)),
  })
  .views((self) => ({
    get todoLists(): TodoList[] {
      return self.lists.slice() // fixes re-rendering issue
    },
    get currentList() {
      return self.lists[0]
    }
  }))
  .actions((self) => ({
      addItemToCurrentList(item: string) {
        if (self.selectedList === null) {
          self.lists.replace([TodoList.create({id: uuidv4()}), ...self.lists])
          self.selectedList = self.lists[0]
        }
        self.selectedList.addTodo(item)
      },
      saveCurrentList() {
        // TODO flag selected list as "saved"
        self.selectedList = null
      },
      selectCurrentList(listId: string) {
        const selectedList = self.lists.find((list) => list.id === listId)
        if (!selectedList) {
          throw new Error('Something went wrong')
        }
        self.selectedList = selectedList
      }
    })
  )

export const TodoListsStoreContext = React.createContext(TodoListsStore.create())
export const TodoListsStoreProvider = TodoListsStoreContext.Provider
export const useTodoListsStore = () => React.useContext(TodoListsStoreContext)

type TodoType = Instance<typeof Todo>
type TodoListType = Instance<typeof TodoList>
type TodoListsType = Instance<typeof TodoListsStore>

export interface Todo extends TodoType {
}

export interface TodoList extends TodoListType {
}

export interface TodoLists extends TodoListsType {
}

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
    lists: types.array(types.reference(TodoList)),
    currentList: types.maybeNull(TodoList),
  })
  .views((self) => ({
    get todoLists(): TodoList[] {
      return self.lists.slice() // fixes re-rendering issue
    },
  }))
  .actions((self) => ({
      addItemToCurrentList(item: string) {
        if (self.currentList === null) {
          self.currentList = TodoList.create({id: uuidv4()})
        }
        self.currentList.addTodo(item)
      },
      saveCurrentList() {
        if (self.currentList) {
          self.lists.replace([...self.lists, self.currentList])
          self.lists
          self.currentList
          self.todoLists
        }
        // TODO should reset self.currentList
      },
      selectCurrentList(listId: string) {
        const selectedList = self.lists.find((list) => list.id === listId)
        if (!selectedList) {
          throw new Error('Something went wrong')
        }
        self.currentList = selectedList
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

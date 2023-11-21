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
    get todoLists() {
      return self.lists
    },
  }))
  .actions((self) => ({
      addList(list: string[]) {
        const todoList = TodoList.create({id: uuidv4()})
        list.forEach(text => {
          todoList.addTodo(text)
        })
        self.lists.replace([...self.lists, todoList])
      },
      saveCurrentList() {
        if (self.currentList) {
          self.lists.replace(self.lists.concat(self.currentList))
        }
      },
      addItemToCurrentList(item: string) {
        if (self.currentList === null) {
          self.currentList = TodoList.create({id: uuidv4()})
        }
        self.currentList.addTodo(item)
      }
    })
  )

export const TodoListsStoreContext = React.createContext(TodoListsStore.create())
export const TodoListsStoreProvider = TodoListsStoreContext.Provider
export const useTodoListsStore = () => React.useContext(TodoListsStoreContext)

type TodoType = Instance<typeof Todo>

export interface Todo extends TodoType {
}

import React from 'react';
import {makeObservable, action, observable} from 'mobx';
import {ItemData, newItemData} from "../models/ItemData";
import {types} from 'mobx-state-tree';
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
    id: types.string,
    todos: types.array(Todo),
  })
  .views((self) => ({
    get getTodos() {
      return self.todos
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
  })
  .views((self) => ({
    get todoLists() {
      return self.lists
    }
  }))
  .actions((self) => ({
    addList(list: string[]) {
      const todoList = TodoList.create({id: uuidv4()})
      list.forEach(text => {
        todoList.addTodo(text)
      })
      self.lists.replace([...self.lists, todoList])
    },
  }))

export class ListsStore {
  lists: Array<Map<string, ItemData>> = new Array<Map<string, ItemData>>();

  constructor() {
    makeObservable(this, {
      lists: observable,
      addList: action.bound,
    })
  }

  addList(list: Map<string, ItemData>) {
    this.lists.push(list)
  }

  get getLists() {
    return this.lists
  }
}

export const TodoListsStoreContext = React.createContext(TodoListsStore.create())
export const TodoListsStoreProvider = TodoListsStoreContext.Provider
export const useTodoListsStore = () => React.useContext(TodoListsStoreContext)

import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import {ItemData, newItemData} from "../models/ItemData";

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

const listsStore = new ListsStore();

export const ListsStoreContext = React.createContext(listsStore);
export const ListsStoreProvider = ListsStoreContext.Provider
export const useListsStore = () => React.useContext(ListsStoreContext)

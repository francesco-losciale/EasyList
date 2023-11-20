import {v4 as uuidv4} from "uuid";

export type ItemData = {
  id: string;
  title: string;
  isDone: boolean;
};

export const newItemData = (itemTitle: string) => {
  return {
    id: uuidv4(),
    title: itemTitle,
    isDone: false
  }
}

export const updateItems = (map: Map<string, ItemData>, item: ItemData) => {
  return new Map(map.set(item.id, item))
}

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Todo, TodoList} from "../stores/todoListsStore";
import {observer} from "mobx-react";

const Item = ({item, onPress}: {item: Todo, onPress: (item: Todo) => void}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)} accessibilityRole={'text'}>
      {(item.isDone) ?
        <Text style={styles.titleDone}>{item.title}</Text>:
        <Text style={styles.title}>{item.title}</Text>}
    </TouchableOpacity>
  );
};

// TODO fix this
export const ItemTodoList = ({item, onPress}: {item: TodoList, onPress: (todoList: TodoList) => void}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)} accessibilityRole={'text'}>
      <Text>{item.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  titleDone: {
    fontSize: 32,
    textDecorationLine: 'line-through'
  }
});

export default observer(Item);

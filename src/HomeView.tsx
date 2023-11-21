import {FlatList, ListRenderItem, SafeAreaView} from "react-native";
import {Todo, TodoList, useTodoListsStore} from "./shared/stores/todoListsStore";
import React from "react";
import Item, {ItemTodoList} from "./shared/components/Item";

const HomeView = () => {
  const todoListsStore = useTodoListsStore()
  const onPress = (todoList: TodoList) => console.log('pressed')
  const renderItem: ListRenderItem<TodoList> = ({ item }) => (
    <ItemTodoList item={item} onPress={onPress}></ItemTodoList>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={todoListsStore.todoLists}
        renderItem={renderItem}
        keyExtractor={(list: TodoList) => list.id}
      />
    </SafeAreaView>
  )
}

export default HomeView;

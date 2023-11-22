import {FlatList, ListRenderItem, Pressable, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Todo, TodoList, useTodoListsStore} from "./shared/stores/todoListsStore";
import React from "react";
import Item, {ItemTodoList} from "./shared/components/Item";
import Button from "./shared/components/Button";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "./App";

type HomeViewNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeView = ({navigation}: HomeViewNavigationProps) => {
  const todoListsStore = useTodoListsStore()
  const onPress = (todoList: TodoList) => navigation.navigate('List')
  const renderItem: ListRenderItem<TodoList> = ({item}) => (
    <ItemTodoList item={item} onPress={onPress}></ItemTodoList>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={todoListsStore.todoLists}
        renderItem={renderItem}
        keyExtractor={(list: TodoList) => list.id}
      />
      <Button
        title="Create"
        testID={'button-create-list'}
        onPress={() => {
          navigation.navigate('List')
        }}
      />
    </SafeAreaView>
  )
}

export default HomeView;

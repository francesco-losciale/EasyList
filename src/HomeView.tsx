import {FlatList, ListRenderItem, SafeAreaView} from "react-native";
import {TodoList, useTodoListsStore} from "./shared/stores/todoListsStore";
import React from "react";
import {ItemTodoList} from "./shared/components/Item";
import Button from "./shared/components/Button";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "./App";
import {observer} from "mobx-react";

type HomeViewNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeView = ({navigation}: HomeViewNavigationProps) => {
  const todoListsStore = useTodoListsStore()
  const onPress = (todoList: TodoList) => {
    todoListsStore.selectCurrentList(todoList.id)
    navigation.navigate('List')
  }
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

export default observer(HomeView);

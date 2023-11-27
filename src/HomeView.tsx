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
  const renderItem: ListRenderItem<TodoList> = ({item, index}) => (
    <ItemTodoList item={item} onPress={onPress} testID={'todo-lists-' + index}></ItemTodoList>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={todoListsStore.todoLists}
        renderItem={renderItem}
        keyExtractor={(list: TodoList) => list.id}
        testID={'todo-lists'}
      />
      <Button
        title="Create"
        onPress={() => {
          todoListsStore.reset()
          navigation.navigate('List')
        }}
        testID={'button-create-list'}
      />
    </SafeAreaView>
  )
}

export default observer(HomeView);

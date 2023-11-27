import {FlatList, ListRenderItem, SafeAreaView, StyleSheet, TextInput, View,} from 'react-native';
import React, {useState} from 'react';
import Button from './shared/components/Button';
import Separator from './shared/components/Separator';
import Item from "./shared/components/Item";
import {observer} from "mobx-react";
import {Todo, TodoList, useTodoListsStore} from "./shared/stores/todoListsStore";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "./App";

type ListViewNavigationProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListView = ({navigation}: ListViewNavigationProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const todoListsStore = useTodoListsStore()

  const onPress = (item: Todo) => item.toggle()
  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <Item item={item} onPress={onPress}/>
  );
  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'Insert text here'}
          onChangeText={setInputValue}
          value={inputValue}
        />
        <Button
          title="Add"
          testID={'button-add-item'}
          onPress={() => {
            setInputValue('')
            todoListsStore.addItemToCurrentList(inputValue);
          }}
        />
        <Button
          title="Save"
          testID={'button-save-list-item'}
          onPress={() => {
            todoListsStore.saveCurrentList()
            navigation.navigate('Home')
          }}
        />
      </View>
      <Separator/>
      <FlatList
        data={todoListsStore.currentList?.getTodos}
        renderItem={renderItem}
        keyExtractor={(todo: Todo) => todo.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    margin: 12,
    padding: 10,
  },
});

export default observer(ListView);

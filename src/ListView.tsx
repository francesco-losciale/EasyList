import {FlatList, SafeAreaView, StyleSheet, TextInput, View,} from 'react-native';
import React, {useState} from 'react';
import Button from './shared/components/Button';
import {ItemData, newItemData, updateItems} from './shared/models/ItemData';
import Separator from './shared/components/Separator';
import Item from "./shared/components/Item";
import {observer} from "mobx-react";
import {useTodoListsStore} from "./shared/stores/listsStore";

const ListView = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Map<string, ItemData>>(new Map<string, ItemData>());
  const todoListsStore = useTodoListsStore()

  const onPress = (item: ItemData) => {
    setItems(updateItems(items, {...item, isDone: true}))
  }
  const renderItem = ({item}: {item: ItemData}) => <Item item={item} onPress={onPress} />;

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
            setItems(updateItems(items, newItemData(inputValue)));
          }}
        />
        <Button
          title="Save"
          testID={'button-save-list-item'}
          onPress={() => {
            todoListsStore.addList([...items.values()].map(item => item.title))
          }}
        />
      </View>
      <Separator />
      <FlatList
        data={[...items.values()]
          .filter(item => !item.isDone)
          .concat([...items.values()]
            .filter(item => item.isDone))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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

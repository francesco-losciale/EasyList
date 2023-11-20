import {FlatList, SafeAreaView, StyleSheet, TextInput, View,} from 'react-native';
import React, {useState} from 'react';
import Button from './shared/components/Button';
import {ItemData, newItemData, updateItems} from './shared/models/ItemData';
import Separator from './shared/components/Separator';
import Item from "./shared/components/Item";

const ListView = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Map<string, ItemData>>(new Map<string, ItemData>());
  const onPress = (item: ItemData) => {
    item.isDone = true
    setItems(new Map(items.set(item.id, item)))
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
          onPress={() => {
            setInputValue('')
            setItems(updateItems(items, newItemData(inputValue)));
          }}
        />
      </View>
      <Separator />
      <FlatList
        data={[...items.values()]}
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

export default ListView;

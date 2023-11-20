import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from './shared/components/Button';
import {ItemData} from './shared/models/ItemData';
import Separator from './shared/components/Separator';
import {v4 as uuidv4} from 'uuid';
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
            //TODO extract
            const item = {id: uuidv4(), title: inputValue, isDone: false} as ItemData;
            setInputValue('')
            setItems(new Map(items.set(item.id, item)));
          }}
        />
      </View>
      <Separator />
      <FlatList
        data={[...items.values()]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={items} // TODO
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

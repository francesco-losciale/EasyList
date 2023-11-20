import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ItemData} from '../models/ItemData';

const Item = ({item, onPress}: {item: ItemData, onPress: (item: ItemData) => void}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      {(item.isDone) ?
        <Text style={styles.titleDone}>{item.title}</Text>:
        <Text style={styles.title}>{item.title}</Text>}
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

export default Item;

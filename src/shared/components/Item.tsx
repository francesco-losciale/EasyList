import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ItemData} from '../models/ItemData';

const Item = ({item}: {item: ItemData}) => {
  return (
    <TouchableOpacity style={[styles.item]}>
      <Text style={[styles.title]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export const renderItem = ({item}: {item: ItemData}) => <Item item={item} />;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Item;

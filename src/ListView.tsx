import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Button from './shared/components/Button';
import {renderItem} from './shared/components/Item';
import {DATA} from './shared/models/ItemData';
import Separator from './shared/components/Separator';

const ListView = () => {
  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder={'Insert text here'}
        />
        <Button
          title="Add"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <Separator />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={null} // TODO
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

import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

type ButtonProps = {
  onPress: () => void;
  title: string;
};

const Button = ({onPress, title = 'Save'}: ButtonProps) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      testID={'button-add-item'}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'deepskyblue',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Button;

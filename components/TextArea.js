// components/TextArea.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TextArea({ 
  placeholder, 
  value, 
  onChangeText, 
  maxLength = 1000,
  numberOfLines = 6,
  ...props 
}) {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      numberOfLines={numberOfLines}
      maxLength={maxLength}
      textAlignVertical="top"
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
    minHeight: 120,
  },
});

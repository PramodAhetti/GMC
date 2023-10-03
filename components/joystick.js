import React from 'react';

import { StyleSheet, Text, View, Button,TouchableOpacity, TextInput } from 'react-native';
const WASDButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ fontSize: 20 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const WASD = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <WASDButton label="W" onPress={() => {
        // Handle W press.
      }} />
      <WASDButton label="A" onPress={() => {
        // Handle A press.
      }} />
      <WASDButton label="S" onPress={() => {
        // Handle S press.
      }} />
      <WASDButton label="D" onPress={() => {
        // Handle D press.
      }} />
    </View>
  );
};

export default WASD;
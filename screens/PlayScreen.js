import React, { Component } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class ContactDetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Dice 1</Text>
        <Button title="Rol" onPress={this.rollDice} />
      </View>
    );
  }
}

rollDice = () => {};

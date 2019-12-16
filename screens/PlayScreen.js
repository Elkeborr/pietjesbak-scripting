import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";


export default class PlayScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Game</Text>
          <Button
            title="Startscherm"
            onPress={() => this.props.navigation.navigate('PlayersScreen')}
          />

            <Button
            title="Einde"
            onPress={() => this.props.navigation.navigate('EndScreen')}
          />
        </View>
      );
    }
  }
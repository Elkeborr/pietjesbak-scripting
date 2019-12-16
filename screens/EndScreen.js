import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class App extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Gefeliciteerd, u heeft gewonnen!</Text>
                <Button title="Rematch"></Button>
                <Button title="Home"></Button>
            </View>
        );
    };
}


export default class EndScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Einde</Text>
          <Button
            title="Startscherm"
            onPress={() => this.props.navigation.navigate('PlayersScreen')}
          />
          <Button
            title="Game"
            onPress={() => this.props.navigation.navigate('PlayScreen')}
          />
        </View>
      );
    }
  }

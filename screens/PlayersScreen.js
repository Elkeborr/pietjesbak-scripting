import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class PlayersScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>StartScherm</Text>
          
          <Button
            title="Game"
            onPress={() => this.props.navigation.navigate('PlayScreen')}
          />

            <Button
            title="einde"
            onPress={() => this.props.navigation.navigate('EndScreen')}
            />
        </View>



      );
    }
  }
import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

function PlayerWon(props) {
  return <Text>Congratulations, you won!</Text>
}

function PlayerLost(props) {
  return <Text>Sorry, you lost!</Text>
}

function Result(props){
  const hasWon = props.hasWon;
  if(hasWon) {
    return <PlayerWon />;
  }
  return <PlayerLost />;
}


export default class EndScreen extends React.Component {
    render() {
      return (
        <View>
          <Result hasWon={false}/>
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate('PlayersScreen')}
          />
          <Button
            title="Rematch"
            onPress={() => this.props.navigation.navigate('PlayScreen')}
          />
        </View>
      );
    }
  }

  
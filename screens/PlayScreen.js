import React, { Component } from "react";
import { Button, View, StyleSheet, Text, Dimensions } from "react-native";
import { Container, TouchContainer, colors } from "./styles";

import {
  SideThree,
  SideOne,
  SideTwo,
  SideFour,
  SideFive,
  SideSix
} from "./components/dice/side";

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.bg,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  playButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 80,
  },
  dice: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})

export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sideOne: 0, sideTwo: 0, sideTree: 0 };
    this._rollDice = this._rollDice.bind(this);
  }

  _rollDice() {
    const sideuno = Math.floor(Math.random() * 6);
    const sidedos = Math.floor(Math.random() * 6);
    const sidetres = Math.floor(Math.random() * 6);
    this.setState({ sideOne: sideuno, sideTwo: sidedos, sideTree: sidetres });
  }

  render() {
    const DiceOne = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideOne
    ];

    const DiceTwo = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideTwo
    ];

    const DiceTree = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideTree
    ];

    return (
      <View style={styles.body}>
        <View style={styles.dice}>
          <DiceOne />
          <DiceTwo />
          <DiceTree />
        </View>
        <View style={styles.playButtons, {width: 120, height: 120}}>
          <Button color={colors.blue} title="Gooien" onPress={this._rollDice} />
          <Button color={colors.red} title="Passen" />
        </View>
        
        <Button
          title="Startscherm"
          onPress={() => this.props.navigation.navigate("PlayersScreen")}
        />
        <Button
          title="Einde"
          onPress={() => this.props.navigation.navigate("EndScreen")}
        />
      </View>
    );
  }
}

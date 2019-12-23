import React, { Component } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { Container, TouchContainer } from "./styles";

import {
  SideThree,
  SideOne,
  SideTwo,
  SideFour,
  SideFive,
  SideSix
} from "./components/dice/side";

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
      <View>
        <Container>
          <Button title="ROl" onPress={this._rollDice} />
          <Button title="PAS" />
          <DiceOne />
          <DiceTwo />
          <DiceTree />
        </Container>

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

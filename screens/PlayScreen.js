import React, { Component } from "react";
import { Button, View, StyleSheet, Text, } from "react-native";
import { Container, TouchContainer } from "./styles";

import {
  SideThree,
  SideOne,
  SideTwo,
  SideFour,
  SideFive,
  SideSix
} from "./components/dice/side";
let sideuno;
let sidedos;
let sidetres;
let countPlus;
export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sideOne: 0, sideTwo: 0, sideTree: 0, count: 0 };
    this._rollDice = this._rollDice.bind(this);
  }

  _rollDice() {
    // De kant van de dobbelsteen bepalen
    sideuno = Math.floor(Math.random() * 6);
    sidedos = Math.floor(Math.random() * 6);
    sidetres = Math.floor(Math.random() * 6);
    // Aantal keer je klikt optellen
    countPlus = this.state.count + 1;
    // Functie aanroepen waarmee je gaat zien hoeveel u totaal is
    points(sideuno, sidedos, sidetres);
    // De state (status) veranderen van de stenen en de kliks
    this.setState({
      sideOne: sideuno,
      sideTwo: sidedos,
      sideTree: sidetres,
      count: countPlus
    });
  }

  _pass(){
    //TODO: naar de volgende speler gaan en de kliks van de roll terug naar 0 zetten
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
        <Button title="ROl" onPress={this._rollDice} />
        <Button title="PAS" onPress={this._pass}/>
        <DiceOne />
        <DiceTwo />
        <DiceTree />
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

/* Optellen van de punten en in een array steken */
function points(sideuno, sidedos, sidetres) {
  let point1 = setScore(sideuno + 1);
  let point2 = setScore(sidedos + 1);
  let point3 = setScore(sidetres + 1);
  let points = point1 + point2 + point3;
  console.log(points);
  //TODO: deze punten moetn in een array van de speler gestoken worden en bijgehouden
}

/* Wat zijn u stenen waard, 1=100, 6==60, de rest is het zelfde */
function setScore(score) {
  switch (score) {
    case 1:
      score = 100;
      break;
    case 6:
      score = 60;
      break;
  }
  return score;
}

//TODO: vergelijken van de punten

// 300 == drie apen
// 69 = soixante neuf
// zand heeft geen totaal, opl voor zoeken
// score vergelijken

//TODO: Strepen verminderen
// 3 apen = 2 mogelijkheden: 1) Alle 9 strepen ng, mag je die ronden niet meedoen 2) Als je minder dan 9 strepen hebt win je
// soixante neuf = 3 strepen verwijderen
// zand = 2 strepen verwijderen 
// hoogste score = 1 streep verwijderen



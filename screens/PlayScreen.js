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

/* sides en clicks initialiseren */
let sideuno;
let sidedos;
let sidetres;
let countClickPlus;

let nextPlayer;

export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sideOne: 0, //eerste dobbelsteen
      sideTwo: 0, //tweede dobbelsteen
      sideTree: 0, //derde dobbelsteen
      countClick: 0, //tellen van de clicks
      player1: "", //eerste speler
      player2: "", //tweede speler
      player3: "", //derde speler
      player4: "", //vierde speler
      is_playing: false, //als er een speler ant spelen is
      is_waiting: false, //als er een speler ant wachten is op zijn beurt
      stripes:0, //het aantal strepen er mee gespeeld wordt
      score1:0,
      score2:0,
      score3:0,
      score4: 0,
      currentPlayer: 1,
      firstPlayerClicks:-1
     };
    this._rollDice = this._rollDice.bind(this);  
  }
  players = () =>{
    //Spelers uit vorige scherm halen
    let players = ['Elke','Jonas','Angelique'];
    //Random speler aanduiden
    let randomNumber = Math.floor(Math.random() * players.length);
    //Namen setten
    this.setState({
      player1: "Elke",
      player2: "Jonas",
      player3: "Angelique",
      currentPlayer: randomNumber
    })

  }
  _rollDice() {
    // De kant van de dobbelsteen bepalen
    sideuno = Math.floor(Math.random() * 6);
    sidedos = Math.floor(Math.random() * 6);
    sidetres = Math.floor(Math.random() * 6);
    // Aantal keer je klikt optellen
    countClickPlus = this.state.countClick + 1;
    // Functie aanroepen waarmee je gaat zien hoeveel u totaal is
    points(sideuno, sidedos, sidetres);
    // De state (status) veranderen van de stenen en de kliks
    this.setState({
      sideOne: sideuno,
      sideTwo: sidedos,
      sideTree: sidetres,
      countClick:countClickPlus
    });
    if(countClickPlus == 3 || countClickPlus == this.state.firstPlayerClicks){
      //veranderen van speler
      countClickPlus = 0;
      nextPlayer = this.state.currentPlayer + 1;
      this.setState({currentPlayer: nextPlayer,
        countClick:countClickPlus
      });
      //console.log(nextPlayer);
    }
  
  }
  pass = () =>{
    //TODO: naar de volgende speler gaan en de kliks van de roll terug naar 0 zetten
    nextPlayer = this.state.currentPlayer + 1;
    this.setState({currentPlayer: nextPlayer});
    console.log(nextPlayer);

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
        <Button title="PAS" onPress={this._pass} />
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
  if (
    point1 == point2 &&
    point2 == point3 &&
    point1 == point3 &&
    points != 300
  ) {
    points = -1;
  }
 // console.log(points);
  return points;
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

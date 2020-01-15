//http://codesandbox.io/s/dice-game-3q87u?from-embed

import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

import {
  SideThree,
  SideOne,
  SideTwo,
  SideFour,
  SideFive,
  SideSix,
} from './components/dice/side';

/* sides en clicks initialiseren */
let sideuno;
let sidedos;
let sidetres;
let countClicks = 0;

let nextPlayer;

export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideOne: 0, //eerste dobbelsteen
      sideTwo: 0, //tweede dobbelsteen
      sideTree: 0, //derde dobbelsteen
      stripes: 0, //het aantal strepen er mee gespeeld wordt
      score1: [],
      score2: [],
      score3: [],
      score4: [],
      player1: 'Elke',
      player2: 'Jonas',
      player3: 'Angelique',
      player4: '',
      amountPlayers: 3,
      whoseTurn: 1, // Whose turn it is
      moves: 0, // How many moves remain in this turn
      gameOver: false,
      winner: 0,
    };
    this._rollDice = this._rollDice.bind(this);
    this._pass = this._pass.bind(this);
  }
  players = () => {
    //Spelers uit vorige scherm halen
    let players = ['Elke', 'Jonas', 'Angelique'];
    //Random speler aanduiden
    let randomNumber = Math.floor(Math.random() * players.length);
    //Namen setten
    this.setState({
      player1: 'Elke',
      player2: 'Jonas',
      player3: 'Angelique',
      currentPlayer: randomNumber,
    });
  };
  _rollDice() {
    // De kant van de dobbelsteen bepalen
    sideuno = Math.floor(Math.random() * 6);
    sidedos = Math.floor(Math.random() * 6);
    sidetres = Math.floor(Math.random()* 6);
    // Functie aanroepen waarmee je gaat zien hoeveel u totaal is
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
      /*waarom punten in -: bij een zand moet je 1 punt onthouden, voor te zien wie
      het hoogste heeft, ik zet da int min zoda die da ni meerekent als punt (herkenningsteken)*/
      points = -point1;
    }

    // Aantal keer je klikt optellen
    countClicks = countClicks + 1;

    let amountMoves = this.state.moves + 1;
    if (this.state.whoseTurn === 2) {
      this.state.score2.push(points);
    } else if (this.state.whoseTurn === 3) {
      this.state.score3.push(points);
    } else if (this.state.whoseTurn === 4) {
      this.state.score4.push(points);
    } else if (this.state.whoseTurn === 1) {
      this.state.score1.push(points);
      this.setState({ moves: amountMoves });
    }
    // De state (status) veranderen van de stenen
    this.setState({
      sideOne: sideuno,
      sideTwo: sidedos,
      sideTree: sidetres,
    });
    if ( countClicks === 3 || countClicks === this.state.moves && this.state.moves !== 0 ) {
      //veranderen van speler
      countClicks = 0;
      nextPlayer = this.state.whoseTurn + 1;
      this.setState({ whoseTurn: nextPlayer });
    }
  }
  _pass() {
    countClicks = 0;
    nextPlayer = this.state.whoseTurn + 1;
    this.setState({ whoseTurn: nextPlayer });
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
        <Text>WhoseTurn</Text>
        <Text>{this.state.whoseTurn}</Text>
        <Text>Total moves allowed</Text>
        <Text>{this.state.moves}</Text>
        <Text>score1</Text>
        <Text>
          {this.state.score1.map(listitem => (
            <li className="list-group-item list-group-item-primary">
              {listitem}
            </li>
          ))}
        </Text>
        <Text>score2</Text>
        <Text>
          {this.state.score2.map(listitem => (
            <li className="list-group-item list-group-item-primary">
              {listitem}
            </li>
          ))}
        </Text>

        <Button title="ROl" onPress={this._rollDice} />
        <Button title="PAS" onPress={this._pass} />
        <DiceOne />
        <DiceTwo />
        <DiceTree />
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

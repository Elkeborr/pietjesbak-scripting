import React, { Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { Container, TouchContainer, colors } from './styles';

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.bg,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width,
    top: 180,
    marginBottom: 15,
  },
  Btn: {
    width: 180,
  },
  dice: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: -40,
  },
  backgroundImage: {
    position: 'absolute',
    top: 160,
    width: 360,
    height: 360,
    zIndex: 0,
  },
  score: {
    top: -200,
    textAlign: 'center',
    width: Dimensions.get('window').width,
    color: '#fff',
  },

  title: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 20,
  },
  thisPlayer: {
    fontWeight: '700',
    fontSize: 40,
    marginLeft: 20,
    marginBottom: 20,
    color: '#fff',
    textTransform: 'uppercase',
  },
  max:{
    alignSelf: 'center',
    color: '#fff',
  },
  scoreList:{
    color: "#fff",
    top: -60,
  },
  volgorde:{
    top: -60,
    color: '#fff',
  }
});

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

// wat is et hoogste
let status_1 = 0;
let status_2 = 0;
let status_3 = 0;
let status_4 = 0;

let scores = [];

//wie is de winnaar van de ronde?
let winnerRound;

//namen van de spelers
let player1;
let player2;
let player3;
let player4;

//strepen updaten
let updatedStripes1;
let updatedStripes2;
let updatedStripes3;
let updatedStripes4;


export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideOne: 0, //eerste dobbelsteen
      sideTwo: 0, //tweede dobbelsteen
      sideTree: 0, //derde dobbelsteen
      stripes: this.props.navigation.state.params.stripesTotal, //het aantal strepen er mee gespeeld wordt
      score1: [],
      score2: [],
      score3: [],
      score4: [],
      player_1: [
        1,
        this.props.navigation.state.params.players.player_1.name,
        this.props.navigation.state.params.players.player_1.stripes,
      ], //id definieren
      player_2: [
        2,
        this.props.navigation.state.params.players.player_2.name,
        this.props.navigation.state.params.players.player_2.stripes,
      ], //id definieren
      player_3: [
        3,
        this.props.navigation.state.params.players.player_3.name,
        this.props.navigation.state.params.players.player_3.stripes,
      ], //id definieren
      player_4: [
        4,
        this.props.navigation.state.params.players.player_4.name,
        this.props.navigation.state.params.players.player_4.stripes,
      ], //id definieren
      amountPlayers: this.props.navigation.state.params.playersCount,
      whoseTurn: 1, // Whose turn it is
      moves: 0, // How many moves remain in this turn
      gameOver: false,
      rounds: 0,
      dualPlayer1: [1],
      dualPlayer2: [2],
      dualPlayer3: [3],
      dualPlayer4: [4],
      whoseTurnDual: 1,
      dualPlayers: 0,
      dualTime: false,
    };
    this._rollDice = this._rollDice.bind(this);
    this._pass = this._pass.bind(this);
    this._dual = this._dual.bind(this);
  }

  _rollDice() {
    let players = this.props.navigation.state.params.players;
    // De kant van de dobbelsteen bepalen
    sideuno = Math.floor(Math.random() * 6);
    sidedos = Math.floor(Math.random() * 6);
    sidetres = Math.floor(Math.random() * 6);

    // Functie aanroepen waarmee je gaat zien hoeveel u totaal is
    let point1 = setScore(sideuno + 1);
    let point2 = setScore(sidedos + 1);
    let point3 = setScore(sidetres + 1);
    let points = point1 + point2 + point3;
console.log(points)
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

    // DRIE APEN
    if (points == 300) {
      console.log('Speler heeft DRIE APEN');
      if (this.state.whoseTurn == 1) {
        if (this.state.player_1[2]  >= this.state.stripes) {
          console.log('Speler 1 verliest, want heeft alle streepjes nog');
        } else {
          console.log('Speler 1 wint!!');
        this.winner = this.props.navigation.state.params.players.player_1.name;
        return this.props.navigation.navigate('EndScreen',{
              winnerName: this.winner,
              player_1_name: this.props.navigation.state.params.players.player_1.name,
              stripes1: this.props.navigation.state.params.stripesTotal,
              player_2_name: this.props.navigation.state.params.players.player_2.name,
              stripes2: this.props.navigation.state.params.stripesTotal,
              player_3_name: this.props.navigation.state.params.players.player_3.name,
              stripes3: this.props.navigation.state.params.stripesTotal,
              player_4_name: this.props.navigation.state.params.players.player_4.name,
              stripes4: this.props.navigation.state.params.stripesTotal,
              stripes: this.props.navigation.state.params.stripesTotal,
              players: this.props.navigation.state.params.playersCount,
      
            });
    }
        }
      
       if (this.state.whoseTurn == 2) {
        if (this.state.player_2[2]  >= this.state.stripes) {
          console.log('Speler 2 verliest, want heeft alle streepjes nog');
        } else {
          console.log('Speler 2 wint!!');
           this.winner = this.props.navigation.state.params.players.player_2.name;
        return this.props.navigation.navigate('EndScreen',{
              winnerName: this.winner,
              player_1_name: this.props.navigation.state.params.players.player_1.name,
              stripes1: this.props.navigation.state.params.stripesTotal,
              player_2_name: this.props.navigation.state.params.players.player_2.name,
              stripes2: this.props.navigation.state.params.stripesTotal,
              player_3_name: this.props.navigation.state.params.players.player_3.name,
              stripes3: this.props.navigation.state.params.stripesTotal,
              player_4_name: this.props.navigation.state.params.players.player_4.name,
              stripes4: this.props.navigation.state.params.stripesTotal,
              stripes: this.props.navigation.state.params.stripesTotal,
              players: this.props.navigation.state.params.playersCount,
      
            });
        }
      } if (this.state.whoseTurn == 3) {
        if (this.state.player_3[2] >= this.state.stripes) {
          console.log('Speler 3 verliest, want heeft alle streepjes nog');
        } else {
          console.log('Speler 3 wint!!');
           this.winner = this.props.navigation.state.params.players.player_3.name;
        return this.props.navigation.navigate('EndScreen',{
              winnerName: this.winner,
              player_1_name: this.props.navigation.state.params.players.player_1.name,
              stripes1: this.props.navigation.state.params.stripesTotal,
              player_2_name: this.props.navigation.state.params.players.player_2.name,
              stripes2: this.props.navigation.state.params.stripesTotal,
              player_3_name: this.props.navigation.state.params.players.player_3.name,
              stripes3: this.props.navigation.state.params.stripesTotal,
              player_4_name: this.props.navigation.state.params.players.player_4.name,
              stripes4: this.props.navigation.state.params.stripesTotal,
              stripes: this.props.navigation.state.params.stripesTotal,
              players: this.props.navigation.state.params.playersCount,
      
            });
        }
      }  if (this.state.whoseTurn == 4) {
        if (this.state.player_4[2] >= this.state.stripes) {
          console.log('Speler 4 verliest, want heeft alle streepjes nog');
        } else {
          console.log('Speler 4 wint!!');
           this.winner = this.props.navigation.state.params.players.player_4.name;
        return this.props.navigation.navigate('EndScreen',{
              winnerName: this.winner,
              player_1_name: this.props.navigation.state.params.players.player_1.name,
              stripes1: this.props.navigation.state.params.stripesTotal,
              player_2_name: this.props.navigation.state.params.players.player_2.name,
              stripes2: this.props.navigation.state.params.stripesTotal,
              player_3_name: this.props.navigation.state.params.players.player_3.name,
              stripes3: this.props.navigation.state.params.stripesTotal,
              player_4_name: this.props.navigation.state.params.players.player_4.name,
              stripes4: this.props.navigation.state.params.stripesTotal,
              stripes: this.props.navigation.state.params.stripesTotal,
              players: this.props.navigation.state.params.playersCount,
      
            });
        }
      }
    }

    // ZEVEN GOOIEN
    if (points == 7) {
      console.log('Speler heeft ZEVEN, iedereen een streepje extra');
      this.setState({ player_1: [1, player1, this.state.player_1[2] + 1] });
      this.setState({ player_2: [2, player2, this.state.player_2[2] + 1] });
      this.setState({ player_3: [3, player3, this.state.player_3[2] + 1] });
      this.setState({ player_4: [4, player4, this.state.player_4[2] + 1] });
    }

    // Aantal keer je klikt optellen
    countClicks = countClicks + 1;

    // bereken hoeveel keer er max gegooid mag worden en de punten erin pushen
    let amountMoves = this.state.moves + 1;
    if (this.state.whoseTurn === this.state.player_2[0]) {
      this.state.score2.push(points);
    } else if (this.state.whoseTurn === this.state.player_3[0]) {
      this.state.score3.push(points);
    } else if (this.state.whoseTurn === this.state.player_4[0]) {
      this.state.score4.push(points);
    } else if (this.state.whoseTurn === this.state.player_1[0]) {
      this.state.score1.push(points);
      this.setState({ moves: amountMoves });
    }
    // De state (status) veranderen van de stenen
    this.setState({
      sideOne: sideuno,
      sideTwo: sidedos,
      sideTree: sidetres,
    });
    // Als er 3 keer gegooid is dan moet de volgende spelen
    if (
      countClicks === 3 ||
      (countClicks === this.state.moves && this.state.moves !== 0)
    ) {
      // Veranderen van speler
      countClicks = 0;
      //console.log(this.state.whoseTurn);
      if (this.state.whoseTurn < this.state.amountPlayers) {
        // Volgende speler
        nextPlayer = this.state.whoseTurn + 1;
        this.setState({ whoseTurn: nextPlayer });
      } else {
        // Ronde is gedaan; terug naar eerste speler & scores worden berekend
        nextPlayer = 1;
        this.setState({ whoseTurn: nextPlayer });

        //strepen van alle spelers
        let stripes = [
          this.state.player_1[2],
          this.state.player_2[2],
          this.state.player_3[2],
          this.state.player_4[2],
        ];
        // de uiteindelijke score
        let finalScores = calculateScores(
          this.state.score1,
          this.state.score2,
          this.state.score3,
          this.state.score4
        );

        let namePlayer1 = this.state.player_1[1];
        let namePlayer2 = this.state.player_2[1];
        let namePlayer3 = this.state.player_3[1];
        let namePlayer4 = this.state.player_4[1];
        // gaan we dueleren of niet?
  
   if (this.state.amountPlayers === 2) {
          if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          
          }
        let roundResults = roundWinner(finalScores, stripes);
        let updatedStripes = roundResults[0];
        let winnerRound = roundResults[1];
        this.setState({ stripes1: updatedStripes[0].stripes1 });
        this.setState({ stripes2: updatedStripes[1].stripes2 });
        this.setState({ stripes3: updatedStripes[2].stripes3 });
        this.setState({ stripes4: updatedStripes[3].stripes4 });
        updatedStripes1 = updatedStripes[0].stripes1;
        updatedStripes2 = updatedStripes[1].stripes2;
        updatedStripes3 = updatedStripes[2].stripes3;
        updatedStripes4 = updatedStripes[3].stripes4;
          
        } 
        
        if (this.state.amountPlayers === 3) {
          if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          }
           let roundResults = roundWinner(finalScores, stripes);
        let updatedStripes = roundResults[0];
        let winnerRound = roundResults[1];
        this.setState({ stripes1: updatedStripes[0].stripes1 });
        this.setState({ stripes2: updatedStripes[1].stripes2 });
        this.setState({ stripes3: updatedStripes[2].stripes3 });
        this.setState({ stripes4: updatedStripes[3].stripes4 });
        updatedStripes1 = updatedStripes[0].stripes1;
        updatedStripes2 = updatedStripes[1].stripes2;
        updatedStripes3 = updatedStripes[2].stripes3;
        updatedStripes4 = updatedStripes[3].stripes4;

        } 
        
        if (this.state.amountPlayers === 4) {
          if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[3] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualPlayer4: [4, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 4,
            });
          } else if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (
            finalScores[2] === finalScores[3] &&
            finalScores[3] === finalScores[0]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[3]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (finalScores[0] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[2] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_3[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if ((finalScores[1] === finalScores[3]) === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          }
           let roundResults = roundWinner(finalScores, stripes);
        let updatedStripes = roundResults[0];
        let winnerRound = roundResults[1];
        this.setState({ stripes1: updatedStripes[0].stripes1 });
        this.setState({ stripes2: updatedStripes[1].stripes2 });
        this.setState({ stripes3: updatedStripes[2].stripes3 });
        this.setState({ stripes4: updatedStripes[3].stripes4 });
        updatedStripes1 = updatedStripes[0].stripes1;
        updatedStripes2 = updatedStripes[1].stripes2;
        updatedStripes3 = updatedStripes[2].stripes3;
        updatedStripes4 = updatedStripes[3].stripes4;
        }

        // Volgorde veranderen op basis van ronde winnnaar

        if (this.state.amountPlayers === 2) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer1, updatedStripes1],
            });
          }
        } else if (this.state.amountPlayers === 3) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
            });
          }
        } else if (this.state.amountPlayers === 4) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
              player_4: [4, namePlayer4, updatedStripes4],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer4, updatedStripes4],
              player_4: [4, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer4, updatedStripes4],
              player_3: [3, namePlayer1, updatedStripes1],
              player_4: [4, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 4) {
            this.setState({
              player_1: [1, namePlayer4, updatedStripes4],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
              player_4: [4, namePlayer3, updatedStripes3],
            });
          }
        }
        let round = this.state.rounds + 1;
        this.setState({
          score1: [],
          score2: [],
          score3: [],
          score4: [],
          countClicks: 0,
          moves: 0,
          rounds: round,
        });
        this.whoseTurn(this.state.rounds);
      }
    }
  }
  // Passen
  _pass() {
    console.log(this.state.moves)
   if (this.state.whoseTurn < this.state.amountPlayers) {
      console.log('ola')
        // Volgende speler
        nextPlayer = this.state.whoseTurn + 1;
        this.setState({ whoseTurn: nextPlayer });
         countClicks = 0;
      } else {
        console.log("helle")
        // Ronde is gedaan; terug naar eerste speler & scores worden berekend
          nextPlayer = 1;
        this.setState({ whoseTurn: nextPlayer });

        //strepen van alle spelers
        let stripes = [
          this.state.player_1[2],
          this.state.player_2[2],
          this.state.player_3[2],
          this.state.player_4[2],
        ];
        // de uiteindelijke score
        let finalScores = calculateScores(
          this.state.score1,
          this.state.score2,
          this.state.score3,
          this.state.score4
        );
        // gaan we dueleren of niet?
  
   if (this.state.amountPlayers === 2) {
          if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          
          } else {
            let roundResults = roundWinner(finalScores, stripes);
        let updatedStripes = roundResults[0];
        let winnerRound = roundResults[1];
        this.setState({ stripes1: updatedStripes[0].stripes1 });
        this.setState({ stripes2: updatedStripes[1].stripes2 });
        this.setState({ stripes3: updatedStripes[2].stripes3 });
        this.setState({ stripes4: updatedStripes[3].stripes4 });
        updatedStripes1 = updatedStripes[0].stripes1;
        updatedStripes2 = updatedStripes[1].stripes2;
        updatedStripes3 = updatedStripes[2].stripes3;
        updatedStripes4 = updatedStripes[3].stripes4;
          }
        } else if (this.state.amountPlayers === 3) {
          if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          }
        } else if (this.state.amountPlayers === 4) {
          if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[3] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualPlayer4: [4, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 4,
            });
          } else if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[2]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (
            finalScores[2] === finalScores[3] &&
            finalScores[3] === finalScores[0]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (
            finalScores[0] === finalScores[1] &&
            finalScores[1] === finalScores[3]
          ) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          } else if (finalScores[0] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[1]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_2[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[0] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_1[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[2] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_3[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if (finalScores[1] === finalScores[3]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 2,
            });
          } else if ((finalScores[1] === finalScores[3]) === finalScores[2]) {
            this.setState({
              dualPlayer1: [1, this.state.player_2[1]],
              dualPlayer2: [2, this.state.player_3[1]],
              dualPlayer3: [3, this.state.player_4[1]],
              dualTime: true,
              dualPlayers: 3,
            });
          }
        }

     
        // Volgorde veranderen op basis van ronde winnnaar

        if (this.state.amountPlayers === 2) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer1, updatedStripes1],
            });
          }
        } else if (this.state.amountPlayers === 3) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
            });
          }
        } else if (this.state.amountPlayers === 4) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
              player_4: [4, namePlayer4, updatedStripes4],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer4, updatedStripes4],
              player_4: [4, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer4, updatedStripes4],
              player_3: [3, namePlayer1, updatedStripes1],
              player_4: [4, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 4) {
            this.setState({
              player_1: [1, namePlayer4, updatedStripes4],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
              player_4: [4, namePlayer3, updatedStripes3],
            });
          }
        }
         let round = this.state.rounds + 1;
        this.setState({
          score1: [],
          score2: [],
          score3: [],
          score4: [],
          countClicks: 0,
          moves: 0,
          rounds: round,
        });
        this.whoseTurn(this.state.rounds);
      }
    
  }

  //dueleren
  _dual() {
    // Random number
    sidedos = Math.floor(Math.random() * 6);
    // De state (status) veranderen van de stenen
    this.setState({
      sideTwo: sidedos,
    });

    //Punten voor niet meedoen spelers op 0 zette
    if (this.state.dualPlayers == 2) {
      this.state.dualPlayer3.push(0);
      this.state.dualPlayer4.push(0);
    } else if (this.state.dualPlayers == 3) {
      this.state.dualPlayer4.push(0);
    }

    //punten wegschrijven
    if (this.state.whoseTurnDual === 1) {
      this.state.dualPlayer1.push(sidedos + 1);
    } else if (this.state.whoseTurnDual === 2) {
      this.state.dualPlayer2.push(sidedos + 1);
    } else if (this.state.whoseTurnDual === 3) {
      this.state.dualPlayer3.push(sidedos + 1);
    } else if (this.state.whoseTurnDual === 4) {
      this.state.dualPlayer4.push(sidedos + 1);
    }

    console.log('punt speler 1:  ' +this.state.dualPlayer1[2]);
    console.log('punt speler 2:  ' + this.state.dualPlayer2[2]);
    // Aantal keer je klikt optellen
    countClicks = countClicks + 1;

    //volgende speler
    if (this.state.whoseTurnDual < this.state.dualPlayers) {
      let next = this.state.whoseTurnDual + 1;
      if (countClicks === 1) {
        this.setState({ whoseTurnDual: next });
        countClicks = 0;
      }
    } else {
      let scoresDual = [
        this.state.dualPlayer1[2],
        this.state.dualPlayer2[2],
        this.state.dualPlayer3[2],
        this.state.dualPlayer4[2],
      ];

      let stripes = [
        this.state.player_1[2],
        this.state.player_2[2],
        this.state.player_3[2],
        this.state.player_4[2],
      ];

      let roundResults = roundWinner(scoresDual, stripes);
      let updatedStripes = roundResults[0];
      let winnerRound = roundResults[1];
        this.setState({ stripes1: updatedStripes[0].stripes1 });
        this.setState({ stripes2: updatedStripes[1].stripes2 });
        this.setState({ stripes3: updatedStripes[2].stripes3 });
        this.setState({ stripes4: updatedStripes[3].stripes4 });
        updatedStripes1 = updatedStripes[0].stripes1;
        updatedStripes2 = updatedStripes[1].stripes2;
        updatedStripes3 = updatedStripes[2].stripes3;
        updatedStripes4 = updatedStripes[3].stripes4;

 if (this.state.amountPlayers === 2) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer1, updatedStripes1],
            });
          }
        } else if (this.state.amountPlayers === 3) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
            });
          }
        } else if (this.state.amountPlayers === 4) {
          if (winnerRound === 1) {
            this.setState({
              player_1: [1, namePlayer1, updatedStripes1],
              player_2: [2, namePlayer2, updatedStripes2],
              player_3: [3, namePlayer3, updatedStripes3],
              player_4: [4, namePlayer4, updatedStripes4],
            });
          } else if (winnerRound === 2) {
            this.setState({
              player_1: [1, namePlayer2, updatedStripes2],
              player_2: [2, namePlayer3, updatedStripes3],
              player_3: [3, namePlayer4, updatedStripes4],
              player_4: [4, namePlayer1, updatedStripes1],
            });
          } else if (winnerRound === 3) {
            this.setState({
              player_1: [1, namePlayer3, updatedStripes3],
              player_2: [2, namePlayer4, updatedStripes4],
              player_3: [3, namePlayer1, updatedStripes1],
              player_4: [4, namePlayer2, updatedStripes2],
            });
          } else if (winnerRound === 4) {
            this.setState({
              player_1: [1, namePlayer4, updatedStripes4],
              player_2: [2, namePlayer1, updatedStripes1],
              player_3: [3, namePlayer2, updatedStripes2],
              player_4: [4, namePlayer3, updatedStripes3],
            });
          }
        }

      countClicks = 0;
      this.setState({
        dualTime: false,
        countClicks: 0,
        dualPlayers: 0,
        moves: 0,
        dualPlayer1: [1],
        dualPlayer2: [2],
        dualPlayer3: [3],
        dualPlayer4: [4],
        whoseTurnDual: 1,
      });


    }
  }
  // naam opvragen van de speler die aan de beurt is
  whoseTurn() {
    let players = this.props.navigation.state.params.players;
    if (this.state.rounds == 0) {
      if (this.state.whoseTurn == this.state.player_1[0]) {
        return this.state.player_1[1];
      } else if (this.state.whoseTurn == this.state.player_2[0]) {
        return this.state.player_2[1];
      } else if (this.state.whoseTurn == this.state.player_3[0]) {
        return this.state.player_3[1];
      } else {
        return this.state.player_4[1];
      }
    } else {
      if (this.state.rounds > 0) {
        //console.log(this.state.player_1);
        if (this.state.whoseTurn == this.state.player_1[0]) {
          return this.state.player_1[1];
        } else if (this.state.whoseTurn == this.state.player_2[0]) {
          return this.state.player_2[1];
        } else if (this.state.whoseTurn == this.state.player_3[0]) {
          return this.state.player_3[1];
        } else {
          return this.state.player_4[1];
        }
      }
    }
  }

  renderNameInput() {
    const inputs = [];
    if(this.state.player_1[1] != ''){
      inputs.push(
      <Text style={styles.volgorde} key={(123)}>
        {this.state.player_1[1]}: {this.state.player_1[2]}
      </Text> 
      )
    }
    if(this.state.player_2[1] != ''){
      inputs.push(<Text style={styles.volgorde} key={(240)}>
        {this.state.player_2[1]}: {this.state.player_2[2]}
      </Text>
      )
    }
    if(this.state.player_3[1] != ''){
      inputs.push(
<Text style={styles.volgorde} key={(389)}>
        {this.state.player_3[1]}: {this.state.player_3[2]}
      </Text>
      )
    }
    if(this.state.player_4[1] != ''){
      inputs.push(
        <Text style={styles.volgorde} key={(573)}>
        {this.state.player_4[1]}: {this.state.player_4[2]}
      </Text>
      )
    }
    return inputs;
  }

  render() { 
      if(this.state.player_1[2] == 0 || this.state.player_2[2] == 0 ||
      this.state.player_3[2] == 0 || this.state.player_4[2] == 0 ||
      this.state.player_1[2] < 0 || this.state.player_2[2] < 0 ||
      this.state.player_3[2] < 0 || this.state.player_4[2]< 0 ){
        

      if (this.state.player_1[2] == 0 || this.state.player_1[2] < 0){
        this.winner = this.props.navigation.state.params.players.player_1.name;
         console.log(this.winner);
      }
      else if (this.state.player_2[2] == 0 || this.state.player_2[2] < 0){
        this.winner = this.props.navigation.state.params.players.player_2.name;
     
        console.log(this.winner);
      }

      else if (this.state.player_3[2] == 0 || this.state.player_3[2] < 0){
        this.winner = this.props.navigation.state.params.players.player_3.name;
       
        console.log(this.winner);
      }

      else if (this.state.player_4[2] || this.state.player_4[2] < 0){
        this.winner = this.props.navigation.state.params.players.player_4.name;
       
        console.log(this.winner);
      }

      this.setState({
         score1: [],
      score2: [],
      score3: [],
      score4: [],
      player_1: [
        1,
        this.props.navigation.state.params.players.player_1.name,
        this.props.navigation.state.params.players.player_1.stripes,
      ], //id definieren
      player_2: [
        2,
        this.props.navigation.state.params.players.player_2.name,
        this.props.navigation.state.params.players.player_2.stripes,
      ], //id definieren
      player_3: [
        3,
        this.props.navigation.state.params.players.player_3.name,
        this.props.navigation.state.params.players.player_3.stripes,
      ], //id definieren
      player_4: [
        4,
        this.props.navigation.state.params.players.player_4.name,
        this.props.navigation.state.params.players.player_4.stripes,
      ], //id definieren
      amountPlayers: this.props.navigation.state.params.playersCount,
      whoseTurn: 1, // Whose turn it is
      moves: 0, // How many moves remain in this turn
      })


        return this.props.navigation.navigate('EndScreen',{
              winnerName: this.winner,
              player_1_name: this.props.navigation.state.params.players.player_1.name,
              stripes1: this.props.navigation.state.params.stripesTotal,
              player_2_name: this.props.navigation.state.params.players.player_2.name,
              stripes2: this.props.navigation.state.params.stripesTotal,
              player_3_name: this.props.navigation.state.params.players.player_3.name,
              stripes3: this.props.navigation.state.params.stripesTotal,
              player_4_name: this.props.navigation.state.params.players.player_4.name,
              stripes4: this.props.navigation.state.params.stripesTotal,
              stripes: this.props.navigation.state.params.stripesTotal,
              players: this.props.navigation.state.params.playersCount,
      
            });
    }
    let players = this.props.navigation.state.params.players;
    const { navigation } = this.props;

    const DiceOne = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideOne
    ];

    const DiceTwo = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideTwo
    ];

    const DiceTree = [SideOne, SideTwo, SideThree, SideFour, SideFive, SideSix][
      this.state.sideTree
    ];

    // namen in wegschrijven
    player1 = this.props.navigation.state.params.players.player_1.name;
    player2 = this.props.navigation.state.params.players.player_2.name;
    player3 = this.props.navigation.state.params.players.player_3.name;
    player4 = this.props.navigation.state.params.players.player_4.name;

    return (
      <View style={styles.body}>
        <Image style={styles.backgroundImage} source={require('../assets/bak.png')}/>
        <View style={styles.score}>
          <Text style={[styles.title]}title="De beurt is aan:">De beurt is aan:</Text>
          <Text style={[styles.thisPlayer]}>{this.whoseTurn()}</Text>
          <Text style={styles.max} title="Max aantal worpen:">Max aantal worpen: {this.state.moves}</Text>
        </View>
       
        <View style={styles.dice}>
          <DiceOne/>
          <DiceTwo/>
          <DiceTree/>
        </View>
        <View style={styles.playButtons}>

        {this.state.dualTime ? (
         null
        ) : <View style={styles.Btn}><Button title="ROl" color={colors.blue} onPress={this._rollDice} /></View>}
     {this.state.dualTime ? (
         null
        ) : <View style={styles.Btn}><Button
        title="PAS"
        color={colors.red}
        style={{ marginTop: 15 }}
        onPress={this._pass}
      /></View> }
     
   
        {this.state.dualTime ? (
          <View style={styles.Btn}><Button title="DUEL" onPress={this._dual} /></View>
        ) : null}
        </View>
        <View>{this.renderNameInput()}</View>
        
      </View>
    );
  }
}

/* Wat zijn u stenen waard, 1=100, 6=60, de rest is het zelfde */
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

function calculateScores(score1, score2, score3, score4) {
  if (score1.length !== 0) {
    //loopen over score 1 en zien wa tdie als max heeft
    if (score1[0] == 69 || score1[1] == 69 || score1[2] == 69) {
      status_1 = 69;
    } else if (score1[0] < 0 || score1[1] < 0 || score1[2] < 0) {
      status_1 = Math.min(...score1);
    } else {
      status_1 = Math.max(...score1);
    }
  } else {
    status_1 = 0;
  }

  if (score2.length !== 0) {
    //loopen over score 1 en zien wa tdie als max heeft
    if (score2[0] == 69 || score2[1] == 69 || score2[2] == 69) {
      status_2 = 69;
    } else if (score2[0] < 0 || score2[1] < 0 || score2[2] < 0) {
      status_2 = Math.min(...score2);
    } else {
      status_2 = Math.max(...score2);
    }
  } else {
    status_2 = 0;
  }

  if (score3.length !== 0) {
    //loopen over score 1 en zien wa tdie als max heeft
    if (score3[0] == 69 || score3[1] == 69 || score3[2] == 69) {
      status_3 = 69;
    } else if (score3[0] < 0 || score3[1] < 0 || score3[2] < 0) {
      status_3 = Math.min(...score3);
    } else {
      status_3 = Math.max(...score3);
    }
  } else {
    status_3 = 0;
  }

  if (score4.length !== 0) {
    //loopen over score 1 en zien wa tdie als max heeft
    if (score4[0] == 69 || score4[1] == 69 || score4[2] == 69) {
      status_4 = 69;
    } else if (score4[0] < 0 || score4[1] < 0 || score4[2] < 0) {
      status_4 = Math.min(...score4);
    } else {
      status_4 = Math.max(...score4);
    }
  } else {
    status_4 = 0;
  }

  scores = [status_1, status_2, status_3, status_4];
  return scores;
}

function roundWinner(scores, stripes) {
  let highestScore = Math.max(...scores);
  let playerStripes = [];

  if (
    scores[0] == 69 ||
    scores[1] == 69 ||
    scores[2] == 69 ||
    scores[3] == 69
  ) {
    if (scores[0] == 69) {
      let newStripes = stripes[0] - 3;
      playerStripes = [
        { stripes1: newStripes },
        { stripes2: stripes[1] },
        { stripes3: stripes[2] },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 1 wint met SOIXANTE NEUF! Streepjes: ' +
          stripes[0] +
          ' => ' +
          newStripes
      );
      winnerRound = 1;
      return [playerStripes, winnerRound];
    } else if (scores[1] == 69) {
      let newStripes = stripes[1] - 3;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: newStripes },
        { stripes3: stripes[2] },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 2 wint met SOIXANTE NEUF! Streepjes: ' +
          stripes[1] +
          ' => ' +
          newStripes
      );
      winnerRound = 2;
      return [playerStripes, winnerRound];
    } else if (scores[2] == 69) {
      let newStripes = stripes[2] - 3;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: stripes[1] },
        { stripes3: newStripes },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 3 wint met SOIXANTE NEUF! Streepjes: ' +
          stripes[2] +
          ' => ' +
          newStripes
      );
      winnerRound = 3;
      return [playerStripes, winnerRound];
    } else {
      let newStripes = stripes[3] - 3;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: stripes[1] },
        { stripes3: stripes[2] },
        { stripes4: newStripes },
      ];
      console.log(
        'Speler 4 wint met SOIXANTE NEUF! Streepjes: ' +
          stripes[3] +
          ' => ' +
          newStripes
      );
      winnerRound = 4;
      return [playerStripes, winnerRound];
    }
  } else if (scores[0] < 0 || scores[1] < 0 || scores[2] < 0 || scores[3] < 0) {
    if (scores[0] < 0) {
      let newStripes = stripes[0] - 2;
      playerStripes = [
        { stripes1: newStripes },
        { stripes2: stripes[1] },
        { stripes3: stripes[2] },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 1 wint met ZAND! Streepjes: ' + stripes[0] + ' => ' + newStripes
      );
      winnerRound = 1;
      return [playerStripes, winnerRound];
    } else if (scores[1] < 0) {
      let newStripes = stripes[1] - 2;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: newStripes },
        { stripes3: stripes[2] },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 2 wint met ZAND! Streepjes: ' + stripes[1] + ' => ' + newStripes
      );
      winnerRound = 2;
      return [playerStripes, winnerRound];
    } else if (scores[2] < 0) {
      let newStripes = stripes[2] - 2;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: stripes[1] },
        { stripes3: newStripes },
        { stripes4: stripes[3] },
      ];
      console.log(
        'Speler 3 wint met ZAND! Streepjes: ' + stripes[2] + ' => ' + newStripes
      );
      winnerRound = 3;
      return [playerStripes, winnerRound];
    } else {
      let newStripes = stripes[3] - 2;
      playerStripes = [
        { stripes1: stripes[0] },
        { stripes2: stripes[1] },
        { stripes3: stripes[2] },
        { stripes4: newStripes },
      ];
      console.log(
        'Speler 4 wint met ZAND! Streepjes: ' + stripes[3] + ' => ' + newStripes
      );
      return [playerStripes, winnerRound];
    }
  } else if (scores[0] == highestScore) {
    let newStripes = stripes[0] - 1;
    playerStripes = [
      { stripes1: newStripes },
      { stripes2: stripes[1] },
      { stripes3: stripes[2] },
      { stripes4: stripes[3] },
    ];
    winnerRound = 1;
    console.log(
      'Speler 1 wint met HOOGSTE SCORE! Streepjes: ' +
        stripes[0] +
        ' => ' +
        newStripes
    );
    return [playerStripes, winnerRound];
  } else if (scores[1] == highestScore) {
    let newStripes = stripes[1] - 1;
    playerStripes = [
      { stripes1: stripes[0] },
      { stripes2: newStripes },
      { stripes3: stripes[2] },
      { stripes4: stripes[3] },
    ];
    winnerRound = 2;
    console.log(
      'Speler 2 wint met HOOGSTE SCORE! Streepjes: ' +
        stripes[1] +
        ' => ' +
        newStripes
    );
    return [playerStripes, winnerRound];
  } else if (scores[2] == highestScore) {
    let newStripes = stripes[2] - 1;
    playerStripes = [
      { stripes1: stripes[0] },
      { stripes2: stripes[1] },
      { stripes3: newStripes },
      { stripes4: stripes[3] },
    ];
    winnerRound = 3;
    console.log(
      'Speler 3 wint met HOOGSTE SCORE! Streepjes: ' +
        stripes[2] +
        ' => ' +
        newStripes
    );
    return [playerStripes, winnerRound];
  } else if (scores[3] == highestScore) {
    let newStripes = stripes[3] - 1;
    playerStripes = [
      { stripes1: stripes[0] },
      { stripes2: stripes[1] },
      { stripes3: stripes[2] },
      { stripes4: newStripes },
    ];
    winnerRound = 4;
    console.log(
      'Speler 4 wint met HOOGSTE SCORE! Streepjes: ' +
        stripes[3] +
        ' => ' +
        newStripes
    );
    return [playerStripes, winnerRound];
  }
}
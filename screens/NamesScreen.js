import React, { useContext } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  NumberInput,
  Dimensions,
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
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: -100,
    paddingBottom: 40,
  },

  players: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  playerName: {
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 30,
    paddingTop: 10,
  },

  grey: {
    color: '#bbb',
  },
});

export default class NamesScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      player_1: {
        name: '',
        stripes: 0,
      },
      player_2: {
        name: '',
        stripes: 0,
      },
      player_3: {
        name: '',
        stripes: 0,
      },
      player_4: {
        name: '',
        stripes: 0,
      },
    };
  }

  renderNameInput() {
    const playersCount = this.props.navigation.state.params.players;
    const inputs = [];
    for (let i = 1; i <= playersCount; i++) {
      // Try avoiding the use of index as a key, it has to be unique!
      inputs.push(
        <View>
          <Text
            style={{ fontWeight: 'bold', color: '#fff' }}
            title={'Speler_' + i}>
            {'Speler ' + i}
          </Text>
          <TextInput
            style={[styles.playerName, styles.grey]}
            placeholder={'Naam speler ' + i}
            onChangeText={name => this.setState({ ['player_' + i]: { name } })}
          />
        </View>
      );
    }
    return inputs;
  }

  render() {
    const { navigation } = this.props;
    const stripesTotal = this.props.navigation.state.params.stripes;
    const playersCount = this.props.navigation.state.params.players;
    return (
      <View style={styles.body}>
      <Text style={styles.title}>Wie doet er mee?</Text>
      <View style={styles.players}>
          {this.renderNameInput()}</View>
          <Text style={{color:'#fff',marginBottom:10}}title="strepen">Aantal strepen : {stripesTotal}</Text>
          <View style={{marginBottom:10}}>
          <Button
            title="Start spel"
            color={colors.blue}
            style={{marginBottom:10}}
            onPress={() => {
              this.props.navigation.navigate('PlayScreen', {
                players: {
                  player_1: {
                    id: 1,
                    name: this.state.player_1.name,
                    stripes: stripesTotal,
                    score: 0,
                  },
                  player_2: {
                    id: 2,
                    name: this.state.player_2.name,
                    stripes: stripesTotal,
                    score: 0,
                  },
                  player_3: {
                    id: 3,
                    name: this.state.player_3.name,
                    stripes: stripesTotal,
                    score: 0,
                  },
                  player_4: {
                    id: 4,
                    name: this.state.player_4.name,
                    stripes: stripesTotal,
                    score: 0,
                  },
                },
                playersCount: playersCount,
                stripesTotal: stripesTotal,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

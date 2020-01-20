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
    top: -60,
    width: Dimensions.get('window').width,
  },

  players: {
    color: '#fff',
    padding: 10,
    top: -40,
    textAlign: 'center',
  },
  playerName: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    width: 280,
    top: 16,
    marginBottom: 12,
  },

  grey: {
    color: '#fff',
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
        <View key={(i)}>
          <Text
            style={{ fontWeight: 'bold', color: '#fff', top: 12 }} key={(i*265)}
            title={'Speler_' + i}>
            {'Speler ' + i}
          </Text>
          <TextInput key={i}
            style={[styles.playerName, styles.grey]}
            placeholder={'Voer naam speler ' + i + ' in.'} placeholderTextColor={'rgba(255,255,255,0.8)'}
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
          <Text style={{color:'#fff',marginBottom:10}}title="strepen">Aantal strepen: {stripesTotal}</Text>
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

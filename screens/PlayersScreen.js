import React, { useContext } from 'react';
import { Button, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Container, TouchContainer, colors } from './styles';

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.bg,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 5,
    width: 400,
    fontSize: 30,
    tintColor:'#000000',
    marginRight: 5
  },
  titles: {
    color: '#fff',
    margin: 10,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    top: -80,
    width: Dimensions.get('window').width,
  },
  info: {
    alignSelf: 'center',
    color: '#ffffff',
    bottom: 12,
    top: 28,
  }
});

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: 0,
      stripes: 0,
    };
  }

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.title}>Pietjesbak</Text>
        <View>
          <Text style={styles.titles}>Hoeveel spelers?</Text>

          <View style={styles.Buttons}>
            <Button 
              title="2 spelers"
              onPress={players =>
                this.setState({ players: (this.setState.players = 2) })
              }
            />
            <Button
              title="3 spelers"
              onPress={players =>
                this.setState({ players: (this.setState.players = 3) })
              }
            />
            <Button
              title="4 spelers"
              onPress={players =>
                this.setState({ players: (this.setState.players = 4) })
              }
            />
          </View>

          <Text style={styles.titles}>Hoeveel streepjes?</Text>

          <View style={styles.Buttons}>
            <Button
              title="7 streepjes"
              onPress={stripes =>
                this.setState({ stripes: (this.setState.stripes = 7) })
              }
            />
            <Button
              title="9 streepjes"
              onPress={stripes =>
                this.setState({ stripes: (this.setState.stripes = 9) })
              }
            />
            <Button
              title="12 streepjes"
              onPress={stripes =>
                this.setState({ stripes: (this.setState.stripes = 12) })
              }
            />
          </View>
          <Text style={styles.info}>{this.state.players} aantal spelers. {this.state.stripes} aantal streepjes.</Text>
          <View style={{ width: 80, alignSelf: 'center', top: 60 }}>
            <Button
              title="Start"
              color={colors.blue}
              onPress={() => {
                this.props.navigation.navigate('NamesScreen', {
                  players: this.state.players,
                  stripes: this.state.stripes,
                });
                this.setState({ stripes: 0, players: 0 });
              }}
            />
          </View>
          <View style={{ width: 80, alignSelf: 'center', marginTop: 20 }}>
          </View>
        </View>
      </View>
    );
  }
}

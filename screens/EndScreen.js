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
  title: {
    color: '#fff',
  },
  button:{
    marginTop:100,
    
  },
});

export default class EndScreen extends React.Component {

    render() {
      const { navigation } = this.props;
      const stripesTotal = this.props.navigation.state.params.stripes;
      const playersCount = this.props.navigation.state.params.players;
          return (
            <View style={styles.body}>
              <Text style={styles.title}>Gefeliciteerd</Text>
              <Text style={styles.title}> {JSON.stringify(navigation.getParam('winnerName', 'winnaar'))} heeft gewonnen</Text>
              <View style={styles.button}>
                <Button
                      title="Rematch"
                      onPress={() => {this.props.navigation.navigate('PlayScreen', {
                        players: {
                          player_1: {
                            id: 1,
                            name: this.props.navigation.state.params.player_1_name,
                            stripes: this.props.navigation.state.params.stripes,
                            score: 0,
                          },
                          player_2: {
                            id: 2,
                            name: this.props.navigation.state.params.player_2_name,
                            stripes: this.props.navigation.state.params.stripes,
                            score: 0,
                          },
                          player_3: {
                            id: 3,
                            name: this.props.navigation.state.params.player_3_name,
                            stripes: this.props.navigation.state.params.stripes,
                            score: 0,
                          },
                          player_4: {
                            id: 4,
                            name: this.props.navigation.state.params.player_4_name,
                            stripes: this.props.navigation.state.params.stripes,
                            score: 0,
                          },
                        },
                      playersCount: playersCount,
                      stripesTotal: stripesTotal,
                      });
                    }}
              
          />
          <Button
                      title="Home"
                      onPress={() => {this.props.navigation.navigate('PlayersScreen')}} />
           </View>
          </View>
        );
      }
    }
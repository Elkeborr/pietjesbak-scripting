import React from "react";
import { StyleSheet, Text, View } from "react-native";



import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PlayersScreen from './screens/PlayersScreen';
import PlayScreen from './screens/PlayScreen';
import EndScreen from './screens/EndScreen';

const MainNavigator = createStackNavigator({
  PlayersScreen: {screen: PlayersScreen},
  PlayScreen: {screen: PlayScreen},
  EndScreen: {screen: EndScreen},
});

const App = createAppContainer(MainNavigator);

export default App




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

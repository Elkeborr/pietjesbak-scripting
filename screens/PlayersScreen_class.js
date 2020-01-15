import React, { useState } from "react";
import { Button, View, StyleSheet, Text, TextInput, FlatList } from "react-native";

import Player from './components/player/player';
import AddPlayer from './components/player/addPlayer';


    
    export default function addPlayers() {
        
        const [enteredPlayers, setEnteredPlayers] = useState([]);

        const addPlayer = enteredName => {
            console.log(enteredName);
            setEnteredPlayers(currentPlayers => [...currentPlayers, {id: Math.random().toString(), name: enteredName}]); // maak array met ingevulde namen
        }
    
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>StartScherm</Text>
          
          <Button
            title="Game"
            onPress={() => this.props.navigation.navigate('PlayScreen')}
          />

            <Button
            title="einde"
            onPress={() => this.props.navigation.navigate('EndScreen')}
            />

        <View>
        
        </View>
        <AddPlayer onAddPlayer={addPlayer} />
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={enteredPlayers}
            renderItem={itemData => <Player name={itemData.item.name} />} 
        />
        
        </View>
      );
    }
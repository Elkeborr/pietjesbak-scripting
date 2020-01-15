import React, { Component, useState } from "react";
import {View, Text, Button, TextInput, FlatList} from "react-native";
/*
import Player from './components/player/player';
import AddPlayer from './components/player/addPlayer';
*/
export default function addPlayers() {
    const [enteredGoal, setEnteredGoal] = useState('');
    const [courseGoals, setCourseGoals] = useState([]);

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText); // set de ingevulde naam
    }

    const addGoalHandler = () => {
        setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
    }
    
    return (
        <View>
            <View style={{ flex: 1, alignItems: 'center', padding: 60, justifyContent: 'center' }}>
                <Text>StartScherm</Text>
      
                <Button title="Game" onPress={() => this.props.navigation.navigate('PlayScreen')} />
                <Button title="einde" onPress={() => this.props.navigation.navigate('EndScreen')} />

            </View>
            <View>
                <TextInput placeholder="Voeg speler toe" onChangeText={goalInputHandler} value={enteredGoal} />
                <Button title="voeg toe" onPress={addGoalHandler} />
            </View>
            <View>
                {courseGoals.map((goal) => <Text key={goal}>{goal}</Text>)}
            </View>
        </View>
    );
}








/*


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
        renderItem={itemData => <Player name={itemData.item.value} />} 
    />
    
    </View>
  );*/
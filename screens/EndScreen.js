import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default class App extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Gefeliciteerd, u heeft gewonnen!</Text>
                <Button title="Rematch"></Button>
                <Button title="Home"></Button>
            </View>
        );
    };
}


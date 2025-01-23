import { StyleSheet, View, Animated } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import React from "react";

export default function LoginScreen() {
    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
            <Text style={styles.loginText}>Login to Your Account!</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8EA",
        flex: 1,
    },
    headText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "center",
        marginTop: "15%",
    },
    loginText: {
        fontSize: 18,
        color: "#404040",
        textAlign: "center",
        marginTop: "5%",
    },
    textInput: {
        color: '#040404',
        borderColor: "#404040",
        borderWidth: 1,
        alignSelf: "left",
        width: "75%",
        marginTop: "5%",
        marginLeft: "5%",
        borderRadius: 10,
    },
});

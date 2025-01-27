import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "@env";

export default function SignupScreen({navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    // const { user, loading, login: loginUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        try {
          await axios.post(`${API_URL}/signup`, {
            name,
            email,
            phone,
            password,
          });
          navigation.navigate("Login");
        } catch (error) {
          setError("Signup failed. Please try again.");
          console.error(error);
        }
      };

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
            <TextInput
                label="Name"
                mode="outlined"
                style={styles.textInput}
                theme={{ colors: { primary: "#404040", outline: "#404040" } }}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                label="E Mail"
                mode="outlined"
                keyboardType="email-address"
                style={styles.textInput}
                theme={{ colors: { primary: "#404040", outline: "#404040" } }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="numeric"
                style={styles.textInput}
                theme={{ colors: { primary: "#404040", outline: "#404040" } }}
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                keyboardType="default"
                secureTextEntry
                style={styles.textInput}
                theme={{ colors: { primary: "#404040", outline: "#404040" } }}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
                <Text style={styles.signInButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <Button
                mode="text"
                onPress={() => navigation.replace("Login")}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Already have anAccount? Login
            </Button>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8EA",
        flex: 1,
        justifyContent:"center",
    },
    headText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "center",
        marginTop: "15%",
        fontFamily: "MonumentExtended-Regular",
    },
    loginText: {
        fontSize: 18,
        color: "#404040",
        textAlign: "center",
        marginTop: "5%",
    },
    textInput: {
        color: "#040404",
        borderColor: "#404040",
        alignSelf: "center",
        width: "80%",
        marginTop: "10%",
        borderRadius: 10,
        backgroundColor: "#FFF8EA",
        activeOutlineColor: "#404040",
        cursorColor: "#404040",
        fontSize: 12,
    },
    button: {
        // marginTop: 15,
        width: "100%",
    },
    buttonText: {
        fontSize: 12,
    },
    signInButton: {
        backgroundColor: "#404040",
        borderRadius: 25,
        borderColor: "#404040",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 2,
        alignSelf: "center",
        marginTop: 30, 
        marginBottom: 20,
        width: "80%",
    },
    signInButtonText: {
        color: "#FFF8EA",
        textAlign: "center",
        fontSize: 18,
    },
    left_hr: {
        width: "80%", 
        height: 1, 
        backgroundColor: "#404040", 
        marginVertical: 30, 
    },
    right_hr: {
        width: "80%", 
        height: 1, 
        backgroundColor: "#404040", 
        marginVertical: 30, 
        marginLeft: "auto",
    },
    text: {
        textAlign: "center",
        color: "#404040",
        fontFamily: "MonumentExtended-Regular",
    },
});

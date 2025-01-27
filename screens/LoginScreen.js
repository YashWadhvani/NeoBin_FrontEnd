import React, { useState, useContext } from "react";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
// import TruckLoader from "../components/loader/TruckLoader";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, loading, login: loginUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            setError(null);
            await loginUser(email, password);
            navigation.replace("Dashboard");
        } catch (error) {
            setError(
                "Login failed. Please check your credentials and try again."
            );
            console.error("Error details:", error);
        }
    };

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
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
                label="Password"
                mode="outlined"
                keyboardType="default"
                secureTextEntry
                style={styles.textInput}
                theme={{ colors: { primary: "#404040", outline: "#404040" } }}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                mode="text"
                onPress={() => navigation.replace("Login")}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Forgot Your Password?
            </Button>
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.left_hr} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.right_hr} />

            <View>
                <Text style={styles.text}>Create an Account</Text>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => navigation.replace("Signup")}
                >
                    <Text style={styles.signInButtonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            {error && (
                <Text style={{ color: "red", textAlign: "center" }}>
                    {error}
                </Text>
            )}
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
        marginTop: 15,
        marginRight: 20,
        marginLeft: "auto",
        width: "65%",
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
        marginTop: 20, 
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

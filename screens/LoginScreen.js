import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import React from "react";

export default function LoginScreen({ navigation }) {
    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
            <TextInput
                label="E Mail"
                mode="outlined"
                keyboardType="email-address"
                style={styles.textInput}
                theme={{
                    colors: {
                        primary: "#404040",
                        outline: "#404040",
                    },
                }}
            />
            <TextInput
                label="Password"
                mode="outlined"
                keyboardType="password"
                secureTextEntry
                style={styles.textInput}
                theme={{
                    colors: {
                        primary: "#404040",
                        outline: "#404040",
                    },
                }}
            />

            <Button
                mode="text"
                onPress={() => navigation.replace("Signup")}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Forgot Your Password?
            </Button>

            <TouchableOpacity
                style={styles.signInButton}
                onPress={() => navigation.replace("Login")}
            >
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.left_hr} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.right_hr} />

            <View style={styles.left_half_view}>
                <Text style={styles.text}>Login with Google</Text>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => navigation.replace("Login")}
                >
                    <Text style={styles.signInButtonText}>Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.left_hr} />

            <View style={styles.right_half_view}>
                <Text style={styles.text}>Create an Account</Text>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => navigation.replace("Signup")}
                >
                    <Text style={styles.signInButtonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: "5%",
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
        marginVertical: 25, 
    },
    right_hr: {
        width: "80%", 
        height: 1, 
        backgroundColor: "#404040", 
        marginVertical: 25, 
        marginLeft: "auto",
    },
    left_half_view: {
        width: "75%",
        marginLeft: -15,
        marginVertical: 15,
    },
    right_half_view: {
        width: "75%",
        marginLeft: "auto",
        marginRight: -15,
        marginVertical: 10,
    },
    text: {
        textAlign: "center",
        color: "#404040",
        fontFamily: "MonumentExtended-Regular",
    },
});

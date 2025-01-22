import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity
} from "react-native";
import { useTheme, Text } from "react-native-paper";

const SplashScreen = ({ navigation }) => {
    const fadeAnim = new Animated.Value(0); // Initial opacity for animation

    useEffect(() => {
        // Start the animation
        Animated.timing(fadeAnim, {
            toValue: 1, // Final opacity
            duration: 5000, // Duration of animation in ms
            useNativeDriver: true,
        }).start();

        // // Navigate to Login after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace("Login"); // Navigate and remove SplashScreen from stack
        }, 6000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [navigation]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.headText}>N E O B I N</Text>
            <Text style={[styles.taglineText]}>- Smart, Sleek, Sustainable </Text>
            <Text style={styles.centerText}>
                Welcome to Smart Waste Management App
            </Text>
            {/* <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.replace('Login')}>
        <Text>Explore!</Text>
      </TouchableOpacity> */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "#FFF8EA",
    },
    headText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "center",
        marginTop: "50%",
    },
    taglineText: {
        fontSize: 14,
        color: "#404040",
        textAlign: "right",
        marginRight: "10%",
    },
    centerText: {
        fontSize: 24,
        textAlign: "center",
        color: "#404040",
        marginTop: "25%",
    },
    exploreButton: {
        color: "#404040",
        borderRadius: 25,
        borderColor: "#404040",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 2,
        alignSelf: "center",
        position: "absolute",
        bottom: 250,
    },
});

export default SplashScreen;

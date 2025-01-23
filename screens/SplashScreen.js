import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const SplashScreen = ({ navigation }) => {
    const fadeAnim1 = useRef(new Animated.Value(0)).current; // Initial opacity for headText
    const fadeAnim2 = useRef(new Animated.Value(0)).current; // Initial opacity for taglineText, centerText, and button
    const translateYAnim = useRef(new Animated.Value(0)).current; // Initial vertical translation for headText

    useEffect(() => {
        // Start animation for headText
        Animated.timing(fadeAnim1, {
            toValue: 1, // Final opacity
            duration: 2000, // Duration of animation in ms
            useNativeDriver: true, // Opacity supports native driver
        }).start(() => {
            // After headText fades in, start moving it up
            Animated.timing(translateYAnim, {
                toValue: -100, // Move up by 100 pixels (adjust as needed)
                duration: 1500, // Duration of translation
                useNativeDriver: true,
            }).start(() => {
                // After moving headText, fade in the remaining content
                Animated.timing(fadeAnim2, {
                    toValue: 1, // Final opacity for taglineText, centerText, and button
                    duration: 2000,
                    useNativeDriver: true,
                }).start();
            });
        });
    }, []);

    return (
        <Animated.View style={styles.container}>
            <Animated.Text
                style={[
                    styles.headText,
                    {
                        opacity: fadeAnim1,
                        transform: [{ translateY: translateYAnim }],
                    },
                ]}
            >
                N E O B I N
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.taglineText,
                    {
                        opacity: fadeAnim2, // Fades in after headText animation
                    },
                ]}
            >
                - Smart, Sleek, Sustainable
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.centerText,
                    {
                        opacity: fadeAnim2, // Fades in after headText animation
                    },
                ]}
            >
                Welcome to Smart Waste Management App
            </Animated.Text>

            <Animated.View
                style={[
                    styles.exploreButton,
                    {
                        opacity: fadeAnim2, // Fades in after headText animation
                    },
                ]}
            >
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text>Explore</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8EA",
    },
    headText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "center",
    },
    taglineText: {
        fontSize: 14,
        color: "#404040",
        textAlign: "right",
        alignSelf: "flex-end", // Align tagline to the right
        marginRight: "10%", // Move slightly towards the right from center
        // marginTop: 10, // Space below headText
        transform: [{translateY: -100}]
    },
    centerText: {
        fontSize: 24,
        textAlign: "center",
        color: "#404040",
        marginTop: 25, // Space below taglineText
    },
    exploreButton: {
        color: "#404040",
        borderRadius: 25,
        borderColor: "#404040",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 2,
        alignSelf: "center",
        marginTop: 50, // Space below centerText
    },
});

export default SplashScreen;

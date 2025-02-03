import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function SplashScreen({ navigation }) {
    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(translateYAnim, {
                toValue: -100,
                duration: 1500,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(fadeAnim2, {
                    toValue: 1,
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
                        opacity: fadeAnim2,
                    },
                ]}
            >
                - Smart{"\n   "}Sleek{"\n   "}Sustainable
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.centerText,
                    {
                        opacity: fadeAnim2,
                    },
                ]}
            >
                Welcome to Smart {"\n"} Waste Management App
            </Animated.Text>

            <Animated.View
                style={[
                    styles.exploreButton,
                    {
                        opacity: fadeAnim2,
                    },
                ]}
            >
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={{ fontFamily: "MonumentExtended-Regular" }}>
                        Explore
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
}

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
        fontFamily: "MonumentExtended-Regular",
    },
    taglineText: {
        fontSize: 12,
        color: "#404040",
        textAlign: "left",
        alignSelf: "flex-end",
        marginRight: "16%",
        transform: [{ translateY: -95 }],
        fontFamily: "MonumentExtended-Regular",
    },
    centerText: {
        fontSize: 18,
        textAlign: "center",
        color: "#404040",
        marginTop: 25,
        fontFamily: "MonumentExtended-Regular",
    },
    exploreButton: {
        color: "#404040",
        borderRadius: 25,
        borderColor: "#404040",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 2,
        alignSelf: "center",
        marginTop: 50,
    },
});

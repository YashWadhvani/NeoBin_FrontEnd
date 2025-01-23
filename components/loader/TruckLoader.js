import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TruckLoader({ nextScreen }) {
    const [percentage, setPercentage] = useState(0); // Initial percentage
    const screenWidth = Dimensions.get("window").width; // Get screen width
    const truckAnimation = useRef(new Animated.Value(0)).current; // Animation value for the truck
    const dustbinLift = useRef(new Animated.Value(0)).current; // Vertical lift for the dustbin
    const dustbinRotate = useRef(new Animated.Value(0)).current; // Rotation value for the dustbin
    const navigation = useNavigation(); // Access the navigation object
    const intervalRef = useRef(null); // Store interval reference

    // Function to start the percentage increment
    const startIncrement = () => {
        intervalRef.current = setInterval(() => {
            setPercentage((prev) => {
                if (prev < 100) {
                    return prev + 20; // Increment percentage
                } else {
                    clearInterval(intervalRef.current); // Stop incrementing at 100%
                    setTimeout(() => navigation.replace(nextScreen), 500); // Navigate to the next screen
                    return prev;
                }
            });
        }, 500); // Update every 500ms
    };

    useEffect(() => {
        startIncrement(); // Start increment initially
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, [nextScreen, navigation]);

    // Animate truck movement whenever the percentage changes
    useEffect(() => {
        Animated.timing(truckAnimation, {
            toValue: (screenWidth - 100) * (percentage / 100), // 100px truck width adjustment
            duration: 500, // Animation duration
            useNativeDriver: false, // `false` because we're animating layout properties
        }).start();
    }, [percentage]);

    // Handle dustbin animation
    const handleDustbinAnimation = () => {
        clearInterval(intervalRef.current); // Pause percentage increment during dustbin animation
        Animated.sequence([
            Animated.timing(dustbinLift, {
                toValue: -100, // Lift dustbin by 10px
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinRotate, {
                toValue: 1, // Rotate dustbin 90°
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinRotate, {
                toValue: 0, // Rotate dustbin back to original position
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinLift, {
                toValue: 0, // Lower the dustbin back
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            startIncrement(); // Resume percentage increment after dustbin animation
        });
    };

    // Trigger dustbin animation when percentage reaches 60%
    useEffect(() => {
        if (percentage === 60) {
            handleDustbinAnimation();
        }
    }, [percentage]);

    return (
        <View style={styles.container}>
            {/* Percentage Text */}
            <Text style={styles.percentageText}>{percentage}%</Text>

            {/* Animated Truck */}
            <Animated.Image
                source={require("../../assets/images/truckNew1.png")} // Replace with your truck image path
                style={[styles.truckImage, { transform: [{ translateX: truckAnimation }] }]}
                resizeMode="contain"
            />

            {/* Animated Dustbin */}
            <Animated.Image
                source={require("../../assets/images/dustbin.png")} // Replace with your dustbin image path
                style={[
                    styles.dustbinImage,
                    {
                        transform: [
                            { translateY: dustbinLift },
                            {
                                rotate: dustbinRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "90deg"], // Rotate from 0 to 90 degrees
                                }),
                            },
                        ],
                    },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8EA", // Background color of the screen
    },
    percentageText: {
        fontSize: 36, // Font size of the percentage
        fontWeight: "bold",
        color: "#404040", // Text color
        marginBottom: 20,
        fontFamily: "MonumentExtended-Regular",
    },
    truckImage: {
        position: "absolute",
        bottom: 50, // Position truck near the bottom
        width: 100, // Truck width
        height: 60, // Truck height
        left: 0, // Start from the left
    },
    dustbinImage: {
        position: "absolute",
        bottom: -30, // Position dustbin above the truck
        width: 25, // Dustbin width
        height: 25, // Dustbin height
        left: "40%", // Center dustbin
    },
});

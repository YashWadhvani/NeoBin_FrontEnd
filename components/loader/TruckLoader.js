import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function TruckLoader({ nextScreen }) {
    const [percentage, setPercentage] = useState(0); // Initial percentage
    const screenWidth = Dimensions.get("window").width; // Get screen width
    const truckAnimation = useRef(new Animated.Value(0)).current; // Animation value for the truck
    const navigation = useNavigation(); // Access the navigation object

    // Update animation whenever the percentage changes
    useEffect(() => {
        Animated.timing(truckAnimation, {
            toValue: (screenWidth - 100) * (percentage / 100), // 100px truck width adjustment
            duration: 500, // Duration of the animation
            useNativeDriver: false, // `false` because we're animating layout properties
        }).start();
    }, [percentage]);

    // Simulate loading process
    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev < 100) {
                    return prev + 20; // Increment percentage
                } else {
                    clearInterval(interval); // Stop interval when 100% is reached
                    // Navigate to nextScreen when loading is complete
                    setTimeout(() => {
                        navigation.replace(nextScreen); // Navigate to next screen dynamically
                    }, 500); // Wait for a brief moment to let the animation complete
                    return prev;
                }
            });
        }, 1000); // Update every second
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [nextScreen]);

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
        fontFamily: "MonumentExtended-Regular"
    },
    truckImage: {
        position: "absolute",
        bottom: 50, // Position truck near the bottom
        width: 100, // Truck width
        height: 60, // Truck height
        left: 0, // Start from the left
    },
    headlightImage: {
        position: "absolute",
        bottom: 50, // Position truck near the bottom
        width: 100, // Truck width
        height: 60, // Truck height
        left: "236px", // Start from the left
    },
    
});

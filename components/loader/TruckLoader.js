import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TruckLoader({ nextScreen }) {
    const [percentage, setPercentage] = useState(0);
    const screenWidth = Dimensions.get("window").width;
    const truckAnimation = useRef(new Animated.Value(0)).current;
    const dustbinLift = useRef(new Animated.Value(0)).current;
    const dustbinRotate = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const intervalRef = useRef(null);

    const startIncrement = () => {
        intervalRef.current = setInterval(() => {
            setPercentage((prev) => {
                if (prev < 100) {
                    return prev + 20;
                } else {
                    clearInterval(intervalRef.current);
                    setTimeout(() => navigation.replace(nextScreen), 500);
                    return prev;
                }
            });
        }, 500);
    };

    useEffect(() => {
        startIncrement();
        return () => clearInterval(intervalRef.current);
    }, [nextScreen, navigation]);

    useEffect(() => {
        Animated.timing(truckAnimation, {
            toValue: (screenWidth - 100) * (percentage / 100),
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    const handleDustbinAnimation = () => {
        clearInterval(intervalRef.current);
        Animated.sequence([
            Animated.timing(dustbinLift, {
                toValue: -100,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinRotate, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinRotate, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(dustbinLift, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            startIncrement();
        });
    };

    useEffect(() => {
        if (percentage === 60) {
            handleDustbinAnimation();
        }
    }, [percentage]);

    return (
        <View style={styles.container}>
            <Text style={styles.percentageText}>{percentage}%</Text>

            <Animated.Image
                source={require("../../assets/images/truckNew1.png")}
                style={[
                    styles.truckImage,
                    { transform: [{ translateX: truckAnimation }] },
                ]}
                resizeMode="contain"
            />

            <Animated.Image
                source={require("../../assets/images/dustbin.png")}
                style={[
                    styles.dustbinImage,
                    {
                        transform: [
                            { translateY: dustbinLift },
                            {
                                rotate: dustbinRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["0deg", "90deg"],
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
        backgroundColor: "#FFF8EA",
    },
    percentageText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#404040",
        marginBottom: 20,
        fontFamily: "MonumentExtended-Regular",
    },
    truckImage: {
        position: "absolute",
        bottom: 50,
        width: 100,
        height: 60,
        left: 0,
    },
    dustbinImage: {
        position: "absolute",
        bottom: -30,
        width: 25,
        height: 25,
        left: "40%",
    },
});

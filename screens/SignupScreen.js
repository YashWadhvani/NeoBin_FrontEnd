import {
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    Button,
} from "react-native";
import React from "react";

export default function SignupScreen() {
    return (
        <Animated.View style={styles.container}>
            <Text>SignupScreen</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3F4F3C",
        flex: 1,
    },
});

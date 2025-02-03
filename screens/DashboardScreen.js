import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import React from "react";

export default function DashboardScreen({ route }) {
    const { bin } = route.params;

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
            <Text style={styles.subHeadText}>Bin Details</Text>

            <ScrollView contentContainerStyle={styles.detailContainer}>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>Bin ID:</Text>
                    <Text style={styles.value}>{bin.binId}</Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.label}>Weight:</Text>
                    <Text style={styles.value}>{bin.weight || "N/A"}</Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.label}>Distance:</Text>
                    <Text style={styles.value}>{bin.distance || "N/A"}</Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.label}>Gas Concentration:</Text>
                    <Text style={styles.value}>
                        {bin.gas_concentration || "N/A"}
                    </Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.label}>Gas ADC Value:</Text>
                    <Text style={styles.value}>{bin.adc_value || "N/A"}</Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>
                        {bin.location
                            ? `${bin.location.latitude}, ${bin.location.longitude}`
                            : "N/A"}
                    </Text>
                </View>
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8EA",
        flex: 1,
        justifyContent: "center",
    },
    headText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "left",
        fontFamily: "MonumentExtended-Regular",
    },
});

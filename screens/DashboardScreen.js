import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MAPS_API_KEY } from "@env";
import BinLocation from "../assets/images/pin.png";
import React from "react";

export default function DashboardScreen({ route }) {
    const { bin } = route.params;

    // Function to calculate the percentage for progress bars
    const getPercentage = (value, max) => {
        if (!value) return 0;
        return Math.min((value / max) * 100, 100); // Ensure it doesn't exceed 100%
    };
    console.log(bin.location)

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>
            <Text style={styles.subHeadText}>Bin Details</Text>

            <ScrollView contentContainerStyle={styles.detailContainer}>
                {/* Rectangle Cards with Progress Bars */}
                <View style={styles.card}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardTitle}>Bin Fill</Text>
                        <Text style={styles.percentageText}>
                            {bin.weight || 0}%
                        </Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                { width: `${getPercentage(bin.weight, 100)}%` }, // Assuming max weight is 100
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardTitle}>Distance</Text>
                        <Text style={styles.percentageText}>
                            {bin.distance || 0}%
                        </Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${getPercentage(
                                        bin.distance,
                                        200
                                    )}%`,
                                }, // Assuming max distance is 200
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardTitle}>Gas Concentration</Text>
                        <Text style={styles.percentageText}>
                            {bin.gas_concentration || 0}%
                        </Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${getPercentage(
                                        bin.gas_concentration,
                                        100
                                    )}%`,
                                }, // Max concentration 100
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardTitle}>Gas ADC Value</Text>
                        <Text style={styles.percentageText}>
                            {bin.adc_value || 0}%
                        </Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${getPercentage(
                                        bin.adc_value,
                                        1024
                                    )}%`,
                                }, // Max ADC value (e.g., 10-bit ADC)
                            ]}
                        />
                    </View>
                </View>

                {/* Location Display */}
                <View style={styles.locationBox}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>
                        {bin.location
                            ? `${bin.location.latitude}, ${bin.location.longitude}`
                            : "N/A"}
                    </Text>

                    {bin.location &&
                    bin.location.latitude &&
                    bin.location.longitude ? (
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: bin.location.latitude,
                                longitude: bin.location.longitude,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: bin.location.latitude,
                                    longitude: bin.location.longitude,
                                }}
                                pinColor="red"
                            />
                        </MapView>
                    ) : (
                        <Text>No location available</Text>
                    )}
                </View>
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8EA",
        flex: 1,
        padding: 16,
    },
    headText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#404040",
        textAlign: "left",
        marginBottom: 10,
    },
    subHeadText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#404040",
        marginBottom: 20,
    },
    detailContainer: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#404040",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    cardTextView: {
        display: "flex",
        flexDirection: "row",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#FFF8EA",
        width: "50%",
    },
    progressBarBackground: {
        width: "100%",
        height: 12,
        backgroundColor: "#FFF8EA",
        borderRadius: 6,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        // backgroundColor: "#7D7D7D",
        // backgroundColor: "#4CAF50",
        backgroundColor: "#FF6F61",
        borderRadius: 6,
    },
    percentageText: {
        textAlign: "right",
        marginBottom: 16,
        fontSize: 16,
        color: "#FFF8EA",
        fontWeight: "500",
        width: "50%",
    },
    locationBox: {
        backgroundColor: "#404040",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF8EA",
    },
    value: {
        fontSize: 14,
        color: "#FFF8EA",
        marginTop: 4,
    },
    map: {
        width: "100%",
        height: 200,
        flex: 1,
    },
});

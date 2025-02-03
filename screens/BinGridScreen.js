import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";

export default function BinGridScreen({ navigation }) {
    const [bins, setBins] = useState([]);

    const binData = async () => {
        try {
            const binResponse = await axios.get(`${API_URL}/bins`);
            const filteredBins = binResponse.data.filter(
                (bin) => !bin.sequence_value
            );
            setBins(filteredBins);
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    useEffect(() => {
        binData();
    }, []);

    const renderBin = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.binContainer}
                onPress={() => navigation.navigate("Dashboard", { bin: item })}
            >
                <View style={styles.binIcon}>
                    <Image
                        source={require("../assets/images/trash.png")}
                        style={styles.binImage}
                    />
                    <Text style={styles.binId}>Bin ID: {item.binId}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.headText}>N E O B I N</Text>

            {bins.length === 0 ? (
                <Text style={styles.loadingText}>Loading bins...</Text>
            ) : (
                <FlatList
                    data={bins}
                    renderItem={renderBin}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                />
            )}
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
    grid: {
        justifyContent: "",
    },
    binContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        margin: 10,
        elevation: 5,
        width: "40%",
    },
    binText: {
        fontSize: 16,
        marginTop: 8,
        color: "#404040",
        fontWeight: "bold",
        fontFamily: "MonumentExtended-Regular",
    },
    loadingText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 18,
        color: "#404040",
        fontFamily: "MonumentExtended-Regular",
    },
    binImage: {
        width: 50,
        height: 50,
        alignSelf: "center",
    },
});

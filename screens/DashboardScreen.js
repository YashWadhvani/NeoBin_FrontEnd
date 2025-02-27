import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Button,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  
  export default function DashboardScreen({ route, navigation }) {
    const { bin } = route.params;
  
    // Function to calculate the percentage for progress bars
    const getPercentage = (value, max) => {
      if (!value) return 0;
      return Math.round(Math.min((value / max) * 100, 100)); // Ensure it doesn't exceed 100%
    };
  
    // Extract the last recorded values
    const lastWeight = bin.weight?.[bin.weight.length - 1]?.value || 0;
    const lastDistance = bin.distance?.[bin.distance.length - 1]?.value || 0;
    const lastAdcValue = bin.adc_value?.[bin.adc_value.length - 1]?.value || 0;
    let lastTimeStamp = bin.weight?.[bin.weight.length - 1]?.timestamp || "N/A";
  
    lastTimeStamp = new Date(lastTimeStamp);
    // Convert to IST by adding 5 hours and 30 minutes
    const ISTOffset = 5.5 * 60; // 5 hours 30 minutes in minutes
    lastTimeStamp.setMinutes(lastTimeStamp.getMinutes() - ISTOffset);
  
    return (
      <Animated.View style={styles.container}>
        <Text style={styles.headText}>N E O B I N</Text>
        <Text style={styles.subHeadText}>Bin Details</Text>
  
        <ScrollView contentContainerStyle={styles.detailContainer}>
          {/* Bin Fill */}
          <View style={styles.card}>
            <View style={styles.cardTextView}>
              <Text style={styles.cardTitle}>Bin Fill</Text>
              <Text style={styles.percentageText}>
                {getPercentage(lastWeight, 10000)}%
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  { width: `${getPercentage(lastWeight, 10000)}%` },
                ]}
              />
            </View>
          </View>
  
          {/* Distance */}
          <View style={styles.card}>
            <View style={styles.cardTextView}>
              <Text style={styles.cardTitle}>Distance</Text>
              <Text style={styles.percentageText}>
                {getPercentage(lastDistance, 200)}%
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${getPercentage(lastDistance, 200)}%`,
                  },
                ]}
              />
            </View>
          </View>
  
          {/* Gas ADC Value */}
          <View style={styles.card}>
            <View style={styles.cardTextView}>
              <Text style={styles.cardTitle}>Gas ADC Value</Text>
              <Text style={styles.percentageText}>
                {getPercentage(lastAdcValue, 1024)}%
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${getPercentage(lastAdcValue, 1024)}%`,
                  },
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
          </View>
  
          {/* Last Updated Time Display */}
          <View style={styles.locationBox}>
            <Text style={styles.label}>Last Updated Time:</Text>
            <Text style={styles.value}>
              {lastTimeStamp
                ? lastTimeStamp.toLocaleString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })
                : "N/A"}
            </Text>
          </View>
        </ScrollView>
  
        <TouchableOpacity
          onPress={() => navigation.navigate("Chart", { bin: bin })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Charts</Text>
        </TouchableOpacity>
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
    button: {
      backgroundColor: "#FF6F61",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
      marginTop: 20,
  },
  buttonText: {
      color: "#FFF8EA",
      fontSize: 16,
      fontWeight: "bold",
  },
  });
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const screenWidth = Dimensions.get("window").width;

const ChartScreen = ({ route }) => {
  const { bin } = route.params;
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [chartData, setChartData] = useState(null);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://neo-bin-back-end.vercel.app/api/v1/bin/${bin.binId}/${timeFrame}`
        );
        console.log("API Response:", response.data);

        if (
          response.data &&
          Array.isArray(response.data.distance) && response.data.distance.length === 0 &&
          Array.isArray(response.data.weight) && response.data.weight.length === 0 &&
          Array.isArray(response.data.gas_value) && response.data.gas_value.length === 0
        ) {
          setNoData(true);
          setChartData(null);
        } else {
          setNoData(false);
          setChartData(response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${timeFrame} chart data:`, error);
        setNoData(true);
        setChartData(null);
      }
    };

    fetchData();
  }, [timeFrame, bin.binId]);

  const extractData = (key) => {
    if (!chartData || !chartData[key]) return { labels: [], data: [] };

    return {
      labels: chartData[key].map(item => item.date || item.month || item.hour),
      data: chartData[key].map(item => item.average),
    };
  };

  const distanceData = extractData("distance");
  const weightData = extractData("weight");
  const gasData = extractData("gas_value");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={timeFrame}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeFrame(itemValue)}
        >
          <Picker.Item label="Hourly" value="hourly" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      {noData ? (
        <View style={styles.noDataContainer}>
          <Text>No data found for {timeFrame}, please select another timeframe.</Text>
        </View>
      ) : (
        chartData && (
          <View>
            <Text style={styles.chartTitle}>Distance Over Time</Text>
            <LineChart
              data={{
                labels: distanceData.labels,
                datasets: [{ data: distanceData.data }],
              }}
              width={screenWidth - 32}
              height={220}
              yAxisSuffix="m"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />

            <Text style={styles.chartTitle}>Weight Over Time</Text>
            <LineChart
              data={{
                labels: weightData.labels,
                datasets: [{ data: weightData.data }],
              }}
              width={screenWidth - 32}
              height={220}
              yAxisSuffix="kg"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />

            <Text style={styles.chartTitle}>Gas Value Over Time</Text>
            <LineChart
              data={{
                labels: gasData.labels,
                datasets: [{ data: gasData.data }],
              }}
              width={screenWidth - 32}
              height={220}
              yAxisSuffix="ppm"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        )
      )}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: "#FFF8EA",
  backgroundGradientFrom: "#FF6F61",
  backgroundGradientTo: "#FF6F61",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 8,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "1",
    stroke: "#FFF8EA",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // marginBottom: 16
  },
  scrollViewContent: {
    paddingBottom: 25, // Increase this value to add more space at the bottom
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 1, // Add shadow for Android
      },
      ios: {
        zIndex: 1, // Ensure Picker is above other elements on iOS
      },
    }),
  },
  picker: {
    height: 50,
    width: '100%',
    ...Platform.select({
      android: {
        color: 'black', // Set text color for Android
      },
    }),
  },
});

export default ChartScreen;
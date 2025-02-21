import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ChartScreen = ({ route }) => {
  const { bin } = route.params;
  const [timeFrame, setTimeFrame] = useState('hourly'); // Default timeframe
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://neo-bin-back-end.vercel.app/api/v1/bin/${bin.binId}/${timeFrame}`
        );
        setChartData(response.data);
      } catch (error) {
        console.error(`Error fetching ${timeFrame} chart data:`, error);
      }
    };

    fetchData();
  }, [timeFrame, bin.binId]);

  if (!chartData) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const transformData = (data) => {
    const labels = data.distance.map((item) => item.hour);
    const distanceData = data.distance.map((item) => item.average);
    const weightData = data.weight.map((item) => item.average);
    const gasData = data.gas_value.map((item) => item.average);

    return {
      labels: labels,
      datasets: [
        { data: distanceData, name: 'Distance' },
        { data: weightData, name: 'Weight' },
        { data: gasData, name: 'Gas Value' },
      ],
    };
  };

  const transformedData = transformData(chartData);
  console.log(timeFrame)

  return (
    <ScrollView style={styles.container}>
      <Picker
        selectedValue={timeFrame}
        onValueChange={(itemValue) => setTimeFrame(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Hourly" value="hourly" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>

      {transformedData.datasets.map((dataset) => (
        <View key={dataset.name} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{dataset.name}</Text>
          <LineChart
            data={{
              labels: transformedData.labels,
              datasets: [{ data: dataset.data }],
            }}
            width={350}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loadingContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChartScreen;
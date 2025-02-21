import React from "react";
import { View, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ChartScreen = () => {
  // Example Data
  const data = {
    distance: [{ hour: "18:00", average: 78.2 },{ hour: "20:00", average: 84.6 },{ hour: "22:00", average: 89.0 }],
    weight: [{ hour: "18:00", average: 58.8 },{ hour: "20:00", average: 65.4 },{ hour: "22:00", average: 72.9 }],
    gas_value: [{ hour: "18:00", average: 560 },{ hour: "20:00", average: 650 },{ hour: "22:00", average: 680 }],
  };

  // Extracting labels (X-axis)
  const labels = data.distance.map((item) => item.hour);

  // Extracting dataset (Y-axis)
  const distanceValues = data.distance.map((item) => item.average);
  const weightValues = data.weight.map((item) => item.average);
  const gasValues = data.gas_value.map((item) => item.average);
  console.log(distanceValues)
  console.log(weightValues)
  console.log(gasValues)

  return (
    <ScrollView horizontal>
      <View>
        <LineChart
          data={{
            labels: labels, // X-axis (hours)
            datasets: [
              { data: distanceValues, color: () => "blue", strokeWidth: 2 }, // Distance
              { data: weightValues, color: () => "green", strokeWidth: 2 }, // Weight
              { data: gasValues, color: () => "red", strokeWidth: 2 }, // Gas Value
            ],
          }}
          width={400} // Width of the chart
          height={250} // Height of the chart
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // Line thickness
          }}
          bezier
        />
      </View>
    </ScrollView>
  );
};

export default ChartScreen;

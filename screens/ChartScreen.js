import React from "react";
import { View } from "react-native";
import Svg, { Path, Circle, G, Text } from "react-native-svg";
import * as d3 from "d3-shape";

const ChartScreen = () => {
  // Data Points
  const dataSets = [
    { values: [{ y: 78.2 }, { y: 84.6 }, { y: 89.0 }], label: "Distance", color: "blue" },
    { values: [{ y: 58.8 }, { y: 65.4 }, { y: 72.9 }], label: "Weight", color: "green" },
    { values: [{ y: 560 }, { y: 650 }, { y: 680 }], label: "Gas Value", color: "red" },
  ];

  // Fallback if data is missing
  const safeDataSets = dataSets?.length
    ? dataSets
    : [{ values: [{ y: 0 }], label: "No Data", color: "gray" }];

  // Chart Dimensions
  const width = 300;
  const height = 200;
  const padding = 20;

  // Generate Line Paths
  const linePaths = safeDataSets.map((dataset) => {
    const lineGenerator = d3
      .line()
      .x((d, i) => padding + (i * (width - 2 * padding)) / (dataset.values.length - 1)) // X spacing
      .y((d) => height - padding - d.y / 3) // Invert Y-axis scaling
      .curve(d3.curveMonotoneX);

    return { path: lineGenerator(dataset.values), color: dataset.color };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Svg width={width} height={height}>
        {linePaths.map((dataset, index) => (
          <Path key={index} d={dataset.path} stroke={dataset.color} strokeWidth={2} fill="none" />
        ))}

        {/* Points */}
        {safeDataSets.map((dataset, index) =>
          dataset.values.map((point, i) => (
            <G key={`${index}-${i}`}>
              <Circle
                cx={padding + (i * (width - 2 * padding)) / (dataset.values.length - 1)}
                cy={height - padding - point.y / 3}
                r={4}
                fill={dataset.color}
              />
              {/* Labels */}
              <Text
                x={padding + (i * (width - 2 * padding)) / (dataset.values.length - 1)}
                y={height - padding - point.y / 3 - 10}
                fontSize="10"
                fill="black"
                textAnchor="middle"
              >
                {point.y}
              </Text>
            </G>
          ))
        )}
      </Svg>
    </View>
  );
};

export default ChartScreen;

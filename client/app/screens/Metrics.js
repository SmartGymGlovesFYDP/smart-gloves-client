import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";
import { View, Text, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Card from "../components/Card";
import Screen from "../components/Screen";
import AppSearchBar from "../components/AppSearchBar";
import colors from "../config/colors";
import PATH from "../navigation/path";

export default function Metrics({ navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    _subscribe();
  }, []);

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
  };

  let { x, y, z } = data;

  function returnZero(n) {
    if (!n) {
      return 0;
    } else {
      return n;
    }
  }

  return (
    <Screen style={styles.screen}>
      <View>
        <Text>Line Chart</Text>
        <Text>
          x: {x} y: {y} z: {z}
        </Text>
        <LineChart
          data={{
            labels: ["x", "y", "z"],
            datasets: [
              {
                data: [returnZero(x), returnZero(y), returnZero(z)],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
});

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

export default function HomeScreen({ navigation }) {
  const { rawData, getRawData, setRawData } = useContext(FirebaseContext);

  const resetData = async () => {
    setRawData([]);
    console.log("Data has been reset.");
  };

  const fetchData = async () => {
    if (rawData.length === 0) {
      await getRawData();
    }
    // console.log(rawData[0].ax);
    console.log(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      console.log(rawData[i]);
    }
    // console.log(JSON.stringify(rawData));
    // setData(getRawData());
    // console.log(data);
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Home Screen</Text>
      <AppButton title="Get Data!" color="black" onPress={fetchData} />
      <AppButton title="Reset Data" color="black" onPress={resetData} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
});

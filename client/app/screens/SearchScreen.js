import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import Screen from "../components/Screen";

export default function SearchScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Search Screen</Text>
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

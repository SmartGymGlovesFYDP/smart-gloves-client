import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    margin: "5%",
    borderColor: colors.white,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppButton;

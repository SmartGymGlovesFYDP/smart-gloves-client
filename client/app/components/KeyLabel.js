import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function KeyLabel({ backgroundColor = colors.highlight, title, number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.key, { backgroundColor: backgroundColor }]}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <Text style={[styles.label, { color: backgroundColor }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  key: {
    height: 30,
    width: 30,
    borderRadius: 30,
    alignSelf: "center",
    marginRight: 7.5,
  },
  label: {
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    paddingRight: 16,
  },
  number: {
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    color: colors.whiteP,
    paddingTop: 6,
  },
});
export default KeyLabel;

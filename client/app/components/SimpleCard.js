import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";

function SimpleCard({ name, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.primaryText}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height: "auto",
    width: "auto",
    backgroundColor: colors.whiteP,
    overflow: "hidden",
    borderColor: colors.lightGreyP,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 16,
  },
  ratingStyle: {
    alignSelf: "flex-end",
    paddingRight: 16,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
});

export default SimpleCard;

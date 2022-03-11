import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Rating } from "react-native-rating-element";
import colors from "../config/colors";

function SummaryCardText({ name, rating, units}) {
  return (
          <View style={styles.card}>
              <Text style={styles.primaryText}>{name}</Text>
              <View style={styles.ratingStyle}>
                  <Text style={styles.ratingStyle}>{rating} {units}</Text>
              </View>
          </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height:"auto",
    width:"auto",
    backgroundColor: colors.whiteP,
    overflow: "hidden",
    borderColor: colors.lightGreyP,
    borderBottomWidth: 1,
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 16,
  },
  ratingStyle: {
      alignSelf: "flex-end",
      paddingRight: 8,
      color: colors.blue3P,
      fontSize: 18,
      fontWeight: "500",
      textAlign: "right",
      display: "flex",
      alignItems: "flex-end",
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

export default SummaryCardText;
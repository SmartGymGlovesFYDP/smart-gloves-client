import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating } from "react-native-rating-element";
import colors from "../config/colors";

function SingleRatingCard({ name, rating, onPress }) {
  return (
      <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.card}>
              <Text style={styles.primaryText}>{name}</Text>
              <View style={styles.ratingStyle}>
                <Rating rated={rating} size={14} ratingColor={colors.blue3P}></Rating>
              </View>
          </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height:"auto",
    width:"auto",
    backgroundColor: colors.whiteP,
    overflow: "hidden",
    borderColor: colors.lightGreyP,
    borderWidth: 1,
    flexDirection:"row",
    justifyContent:"space-between",
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

export default SingleRatingCard;
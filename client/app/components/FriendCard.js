import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating } from "react-native-rating-element";
import colors from "../config/colors";

function FriendCard({ name, rating, workouts, onPress }) {
  return (
      <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.card}>
              <Text style={styles.primaryText}>{name}</Text>
              <View style={styles.ratingStyle}>
                <Rating rated={rating} size={14} ratingColor={colors.blue3P}></Rating>
              </View>
              <Text style={styles.secondaryText}>{workouts} Workouts</Text>
          </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height:"auto",
    width:"auto",
    maxWidth: "65%",
    minWidth: 200,
    backgroundColor: colors.whiteP,
    overflow: "hidden",
    borderColor: colors.lightGreyP,
    borderWidth: 1,
    flexDirection:"column",
    justifyContent:"flex-start",
    marginRight: 8,
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
    alignItems: "flex-end",
    paddingTop: 16,
    paddingLeft: 16,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 16,
    paddingLeft: 16,
  },
});

export default FriendCard;
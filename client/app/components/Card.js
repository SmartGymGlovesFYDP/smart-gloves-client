import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating } from "react-native-rating-element";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({ title, rating, image, minutes, sets, reps, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <View style={styles.general}>
            <AppText style={styles.title}>{title}</AppText>
            {rating && (
              <Rating rated={rating} size={15} ratingColor={colors.base} />
            )}
          </View>
          <View style={styles.exerciseDetails}>
            <AppText style={styles.exerciseDetailsText}>
              Minutes:{minutes}
            </AppText>
            <AppText style={styles.exerciseDetailsText}>Sets:{sets}</AppText>
            <AppText style={styles.exerciseDetailsText}>Reps:{reps}</AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginBottom: 15,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
    flexDirection: "row",
  },
  exerciseDetails: {
    flex: 0.25,
    alignItems: "flex-end",
    paddingTop: "0.6%",
  },
  exerciseDetailsText: {
    fontSize: 10,
    color: colors.highlight,
    textAlign: "right",
  },
  general: {
    flex: 0.75,
  },
  image: {
    width: "100%",
    height: 200,
  },
  rating: {
    color: colors.black,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;

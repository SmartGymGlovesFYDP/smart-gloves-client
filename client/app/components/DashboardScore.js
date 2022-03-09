import React from "react";
import {View, StyleSheet,Text} from "react-native";
import colors from "../config/colors";
import { Rating } from "react-native-rating-element";

function DashboardScore({ title, primary,}) {
    return (
        <View style={styles.secondaryHeaderWrapper}>
            <Text style={styles.secondaryHeader}>{title}</Text>
            <Rating
              rated={exercise.rating}
              size={15}
              ratingColor={colors.base}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  
});

export default DashboardScore;
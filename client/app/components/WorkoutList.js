import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";
import SingleRatingCard from "./SingleRatingCard";

function WorkoutList({
  title1,
  thisListScore,
  thisListData,
  navigation,
  PATH,
}) {
  return (
    <View style={styles.exerciseListView}>
      <View style={styles.titleView}>
        <Text style={styles.title1}>{title1}</Text>
        <Text style={styles.title2}>Score {thisListScore}</Text>
      </View>
      <FlatList
        data={thisListData}
        keyExtractor={(thisListData) => thisListData.id.toString()}
        renderItem={({ item }) => (
          <SingleRatingCard
            name={item.timestamp}
            rating={item.stars}
            onPress={() => navigation.navigate(PATH, item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseListView: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "column",
  },
  titleView: {
    flexDirection: "row",
    flex: 1,
  },
  title1: {
    color: colors.greyP,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "left",
    justifyContent: "flex-start",
    paddingLeft: 20,
    flex: 0.5,
  },
  title2: {
    color: colors.greyP,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "right",
    justifyContent: "flex-end",
    paddingRight: 20,
    flex: 0.5,
  },
});

export default WorkoutList;

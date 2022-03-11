import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import colors from "../config/colors";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Rating } from "react-native-rating-element";
import PATH from "../navigation/Path";
import { LogBox } from "react-native";

export default function ExerciseHistoryDetailsScreen({ navigation, route }) {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const exercise = route.params;

  const name = exercise.title;
  const description = exercise.description;
  const overallScore = exercise.overallScore;
  const leftHandScore = exercise.leftHandScore;
  const rightHandScore = exercise.rightHandScore;
  const stars = exercise.stars;
  const tips = exercise.tips;
  
  // [
  //   "Slow down your reps",
  //   "Focus on the quality of your rep",
  //   "Increase the number of sets to maximize gains",
  // ];

  return (
    <Screen style={styles.screen}>
      <Header
        title={name} // exercise.name
        navigation={navigation}
        PATH={PATH.EXERCISE_HISTORY} // PATH.EXERCISE_HISTORY (or maybe remove)
      />
      <View style={styles.scrollview}>
        <ScrollView>
          <View style={styles.bodyView}>
            <Image
              style={styles.image}
              source={require("../assets/generic.jpeg")}
            />
            <View style={styles.description}>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.bodyText}>{description}</Text>
            </View>
            <View style={styles.summary}>
              <Text style={styles.title}>Summary</Text>
              <View style={styles.summaryBodyView}>
                <View style={styles.summaryBodyListView1}>
                  <Text style={styles.summaryTitle1}>Overall Score</Text>
                </View>
                <View style={styles.summaryBodyListView2}>
                  <Text style={styles.summaryTitle2}>
                    {overallScore}
                    {"%"}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryBodyView}>
                <View style={styles.summaryBodyListView1}>
                  <Text style={styles.summaryTitle1}>Left Hand Score</Text>
                </View>
                <View style={styles.summaryBodyListView2}>
                  <Text style={styles.summaryTitle2}>
                    {leftHandScore}
                    {"%"}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryBodyView}>
                <View style={styles.summaryBodyListView1}>
                  <Text style={styles.summaryTitle1}>Right Hand Score</Text>
                </View>
                <View style={styles.summaryBodyListView2}>
                  <Text style={styles.summaryTitle2}>
                    {rightHandScore}
                    {"%"}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryBodyView}>
                <View style={styles.summaryBodyListView1}>
                  <Text style={styles.summaryTitle1}>Form</Text>
                </View>
                <View style={styles.summaryBodyListView2}>
                  <View style={styles.summaryBodyListViewStars}>
                    <Rating
                      rated={stars}
                      size={17}
                      ratingColor={colors.blue3P}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.tips}>
              <Text style={styles.title}>Tips</Text>
              <FlatList
                data={tips}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Text style={styles.bodyTextList}>
                    {"\u2022 "}
                    {item}
                  </Text>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: 255,
    resizeMode: "contain",
    marginTop: 20,
    borderRadius: 25,
  },
  scrollview: {
    backgroundColor: colors.icewhite,
    flex: 1,
  },
  bodyView: {
    backgroundColor: colors.icewhite,
    flex: 1,
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  summary: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  tips: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  title: {
    color: colors.greyP,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "left",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
  bodyText: {
    color: colors.black,
    fontSize: 12,
    borderStyle: "dashed",
    textAlign: "left",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
  bodyTextList: {
    color: colors.black,
    fontSize: 12,
    borderStyle: "dashed",
    textAlign: "left",
    // paddingBottom: 2,
    paddingLeft: 5,
  },
  summaryBodyView: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyP,
    marginLeft: 5,
    marginRight: 5,
  },
  summaryBodyListView1: {
    alignContent: "flex-start",
    flex: 0.5,
    paddingBottom: 10,
  },
  summaryBodyListView2: {
    alignContent: "flex-end",
    flex: 0.45,
  },
  summaryBodyListViewStars: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "flex-end",
    textAlign: "center",
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  summaryTitle1: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "left",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
  summaryTitle2: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "right",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
});

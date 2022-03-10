import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import Header from "../components/Header";
import { Calendar } from "react-native-calendars";
import FriendCard from "../components/FriendCard";
import KeyLabel from "../components/KeyLabel";
import defaultStyles from "../config/styles";
import SimpleCard from "../components/SimpleCard";

export default function MyProgressScreen({ navigation }) {
  tempMarkedDates = {
    "2022-02-04": {
      selected: true,
      selectedColor: colors.green,
    },
    "2022-02-06": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-09": {
      selected: true,
      selectedColor: colors.orange,
    },
    "2022-02-10": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-14": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-15": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-18": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-22": {
      selected: true,
      selectedColor: colors.green,
    },
    "2022-02-24": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-26": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-28": {
      selected: true,
      selectedColor: colors.orange,
    },
    "2022-03-04": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-03-06": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-03-08": {
      selected: true,
      selectedColor: colors.green,
    },
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title={"Progress"} primary={true} />
        <ScrollView style={{ height: "100%" }}>
          <Calendar enableSwipeMonths={true} markedDates={tempMarkedDates} />
          <Text style={styles.monthlySummaryText}>Month Summary</Text>
          <ScrollView style={styles.scrollHor} horizontal={true}>
            <KeyLabel backgroundColor={colors.red} title={"Cardio Days"} />
            <KeyLabel backgroundColor={colors.green} title={"Chest Days"} />
            <KeyLabel backgroundColor={colors.highlight} title={"Leg Days"} />
            <KeyLabel backgroundColor={colors.orange} title={"Arms Days"} />
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={defaultStyles.primaryText}>My Plans</Text>
            <Text style={defaultStyles.onlyTextButton}>View All</Text>
          </View>
          <SimpleCard name={"Best Chest"} />
          <SimpleCard name={"Army Arms"} />
          <SimpleCard name={"Legs for Days"} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={defaultStyles.primaryText}>My Exercises</Text>
            <Text style={defaultStyles.onlyTextButton}>View All</Text>
          </View>
          <SimpleCard name={"Best Chest"} />
          <SimpleCard name={"Army Arms"} />
          <SimpleCard name={"Legs for Days"} />
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteP,
  },
  monthlySummaryText: {
    left: 16,
    top: 5,
    fontStyle: "normal",
    fontSize: 14,
    textAlign: "left",
    color: colors.greyP,
  },
  scrollHor: {
    paddingLeft: 16,
    paddingTop: 10,
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
  },
});

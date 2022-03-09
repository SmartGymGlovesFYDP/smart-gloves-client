import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { color } from "react-native-reanimated";
import Header from "../components/Header";
import DashboardScore from "../components/DashboardScore";
import styles from "../config/styles";
import FriendCard from "../components/FriendCard";
import SingleRatingCard from "../components/SingleRatingCard";

export default function HomeScreen({ navigation }) {
  const { rawData, getRawData, setRawData, getAllWorkouts, addWorkout } = useContext(FirebaseContext);

  return (
    <View style={styles2.container}>
      <SafeAreaView>
        <Header title={"Dashboard"} primary={true}></Header>
        <ScrollView style={{height:"100%"}}>
          <DashboardScore score={78} rating={3.5} month={"March"} workouts={6} minutes={292}></DashboardScore>
          <View style={{flexDirection:"row", justifyContent:"space-between",}}>
            <Text style={styles.primaryText}>My Friends</Text>
            <Text style={styles.onlyTextButton}>View All</Text>
          </View>
          <ScrollView style={styles2.scrollHor} horizontal={true}>
            <FriendCard name={"Ganan"} rating={4} workouts={7}></FriendCard>
            <FriendCard name={"Viggy"} rating={3} workouts={5}></FriendCard>
            <FriendCard name={"Shahil"} rating={4.5} workouts={6}></FriendCard>
            <FriendCard name={"Stefan"} rating={2.5} workouts={4}></FriendCard>
          </ScrollView>
          <View style={{flexDirection:"row", justifyContent:"space-between",}}>
            <Text style={styles.primaryText}>My Recent Workouts</Text>
            <Text style={styles.onlyTextButton}>View All</Text>
          </View>
          <SingleRatingCard name={"March 9, 2022"} rating={3}></SingleRatingCard>
          <SingleRatingCard name={"March 8, 2022"} rating={5}></SingleRatingCard>
          <SingleRatingCard name={"March 7, 2022"} rating={3.5}></SingleRatingCard>
          <SingleRatingCard name={"March 5, 2022"} rating={5}></SingleRatingCard>
          <SingleRatingCard name={"March 3, 2022"} rating={4}></SingleRatingCard>
          <SingleRatingCard name={"March 2, 2022"} rating={4.5}></SingleRatingCard>
          <SingleRatingCard name={"Febuary 27, 2022"} rating={5}></SingleRatingCard>
          <View style={{height:120}}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.whiteP,
  },
  scrollHor:{
    paddingLeft: 16,
    //paddingRight: 16,
    width: "100%",
    flexDirection:"row",
    //paddingHorizontal: 16,
    marginBottom: 16,
  }
});

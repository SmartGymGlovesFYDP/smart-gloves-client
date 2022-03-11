import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, Alert, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import AddButton from "../components/AddButton";
import { color } from "react-native-reanimated";
import Header from "../components/Header";
import DashboardScore from "../components/DashboardScore";
import styles from "../config/styles";
import FriendCard from "../components/FriendCard";
import SingleRatingCard from "../components/SingleRatingCard";
import PATH from "../navigation/Path";

export default function HomeScreen({ navigation }) {
  const { rawData, getRawData, setRawData, getAllWorkouts, addWorkout } = useContext(FirebaseContext);

  return (
    <Screen>
      <View style={styles2.container}>
        {/* <SafeAreaView> */}
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
              {/* <Text style={styles.onlyTextButton}>View All</Text> */}
              <Button style={styles2.viewAllButton} title="View All" onPress={() => navigation.navigate(PATH.MY_WORKOUTS)}/>
            </View>
            <SingleRatingCard name={"March 10, 2022"} rating={5}></SingleRatingCard>
            <SingleRatingCard name={"March 8, 2022"} rating={5}></SingleRatingCard>
            <SingleRatingCard name={"March 3, 2022"} rating={5}></SingleRatingCard>
            <SingleRatingCard name={"February 24, 2022"} rating={4}></SingleRatingCard>
            <SingleRatingCard name={"February 9, 2022"} rating={4.5}></SingleRatingCard>
            <SingleRatingCard name={"January 19, 2022"} rating={1.0}></SingleRatingCard>
            <View style={{height:120}}></View>
          </ScrollView>
        {/* </SafeAreaView> */}
      </View>
    </Screen>
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
  },
  viewAllButton: {
    position:"absolute",
    justifyContent: "flex-end",
    opacity: 0,
    color: colors.primary,
    backgroundColor:"white"
  },
});

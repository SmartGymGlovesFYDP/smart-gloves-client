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

export default function HomeScreen({ navigation }) {
  const { rawData, getRawData, setRawData, getAllWorkouts, addWorkout } = useContext(FirebaseContext);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title={"Dashboard"} primary={true}></Header>
        <ScrollView style={{height:"100%"}}>
          <DashboardScore score={90} rating={4.5} month={"May"} workouts={17} minutes={242}></DashboardScore>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.whiteP,
  },
});

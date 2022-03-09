import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { color } from "react-native-reanimated";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  const { rawData, getRawData, setRawData, getAllWorkouts, addWorkout } = useContext(FirebaseContext);

  // NOTE: Most of the code in the Home Screen is temporary, it is to be moved to the exercise screen
  // Array of exercise objects
  const [exercises, setExercises] = useState([]);

  // NOTE: Ideally this will be the DS used to add a single workout back to the DB
  // var temp = {
  //   createdBy: "Smart Gym",
  //   dateCreated: new Date().toLocaleString(),
  //   equipment: ["Dumbbells"],
  //   exerciseType: ["Cardio"],
  //   gloveSupport: true,
  //   howToDescription: "To be added",
  //   majorMuscle: ["Core"],
  //   minorMuscle: ["N/A"],
  //   name: "Weighted Punches",
  //   notes: "",
  //   userId: ["dSxXdEz906Yso1XK9nTK805XQWA3"],
  //   variation: [
  //     { difficulty: 2, minutes: 10, repetition: 10, sets: 3 },
  //     { difficulty: 4, minutes: 20, repetition: 20, sets: 5 },
  //     { difficulty: 5, minutes: 30, repetition: 30, sets: 7 },
  //   ],
  //   visibility: "public",
  // };

  // NOTE: Example of an object printed on console
  // Object {
  //   "createdBy": "Smart Gym",
  //   "dateCreated": "Thu Jun 24 14:06:52 2021",
  //   "equipment": Array [
  //     "Dumbbells",
  //   ],
  //   "exerciseType": Array [
  //     "Weight",
  //   ],
  //   "gloveSupport": true,
  //   "howToDescription": "To be added",
  //   "majorMuscle": Array [
  //     "Arms",
  //   ],
  //   "minorMuscle": Array [
  //     "Bicep",
  //     "Shoulders",
  //   ],
  //   "name": "Arnold Press",
  //   "notes": "",
  //   "userId": Array [
  //     "dSxXdEz906Yso1XK9nTK805XQWA3",
  //   ],
  //   "variation": Array [
  //     Object {
  //       "difficulty": 2,
  //       "minutes": 10,
  //       "repetition": 10,
  //       "sets": 3,
  //     },
  //     Object {
  //       "difficulty": 4,
  //       "minutes": 20,
  //       "repetition": 20,
  //       "sets": 5,
  //     },
  //     Object {
  //       "difficulty": 5,
  //       "minutes": 30,
  //       "repetition": 30,
  //       "sets": 7,
  //     },
  //   ],
  //   "visibility": "public",
  // }

  const resetRawData = async () => {
    setRawData([]);
    console.log("Data has been reset.");
  };

  const fetchRawData = async () => {
    if (rawData.length === 0) {
      await getRawData();
    }
    // console.log(rawData[0].ax);
    console.log(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      console.log(rawData[i]);
    }
    // console.log(JSON.stringify(rawData));
    // setData(getRawData());
    // console.log(data);
  };

  const fetchWorkouts = async () => {
    let workouts = await getAllWorkouts();
    // This will add all exercises from the database
    workouts.docs.map((doc) => {
      // Append the exercise object to the array
      setExercises((exercises) => [...exercises, doc.data()]);
      // console.log(JSON.stringify(doc.data()));
    });
    // Example to print the specific field from exercise object
    // console.log(exercises[0].equipment);
    console.log(exercises[0]);
  };

  const clearWorkouts = () => {
    setExercises([]);
  };

  const addNewWorkout = async () => {
    console.log("This function will be used to add a new workout");
    // This is for adding all the Workout Objects
    // allWorkouts.forEach(async function (arrayItem) {
    //   console.log(arrayItem);
    //   await addWorkout(arrayItem, "dSxXdEz906Yso1XK9nTK805XQWA3");
    // });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title={"Dashboard"} primary={true}></Header>
        <ScrollView>
          <Header title={"TEST"} primary={false}></Header>
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

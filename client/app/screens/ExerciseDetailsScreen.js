import React, { useState } from "react";
import * as firebase from "firebase";
import { View, SafeAreaView, Text, Image, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from "react-native-rating-element";
import Header from "../components/Header";
import AppButton from "../components/AppButton";

import AppText from "../components/AppText";
import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import styles from "../config/styles";
import ImageContainer from "../components/ImageContainer";
import Path from "../navigation/Path";
import SingleRatingCard from "../components/SingleRatingCard";
import SummaryCardStars from "../components/SummaryCardStars";
import SummaryCardText from "../components/SummaryCardText";

export default function ExerciseDetailsScreen({ route }) {
  const exercise = route.params;
  let temp = "5";

  let currentUserUID = firebase.auth().currentUser.uid;

  //TODO: figure out what is happening using the state hooks
  const [data, setData] = useState([{}]);

  const getBackendCall = () => {
    fetch("http://localhost:8000/exerciseData")
      .then((res) => res.json())
      .then((temp) => console.log(temp))
      .catch((err) => console.log(err));
  };

  const startWorkout = (exercise) => {
    console.log(exercise);

    const db = firebase.firestore();
    db.collection("users").doc(currentUserUID).collection("newWorkout").add({
      workoutName: exercise.title,
      majorMuscle: exercise.majorMuscle,
      difficulty: exercise.difficulty,
      minutes: exercise.minutes,
    });
  };

  return (
    <View style={styles2.container}>
      <SafeAreaView backgroundColor={colors.blue2P}>
        <Header title={exercise.title} primary={false}></Header>
        <ScrollView style={{ height: "100%", backgroundColor: colors.whiteP }}>
          <ImageContainer image={exercise.image}></ImageContainer>
          <AppButton
            title="Start Workout"
            width="auto"
            fontWeight="normal"
            color="primary"
            onPress={() => startWorkout(exercise)}
          />
          <Text style={styles.subHeader}>Description</Text>
          <Text style={styles2.secondaryText}>{exercise.description}</Text>
          <Text style={styles.subHeader}>Summary</Text>
          <SummaryCardStars
            name="Difficulty"
            rating={exercise.difficulty}
          ></SummaryCardStars>
          <SummaryCardText
            name="Category"
            rating={exercise.majorMuscle}
          ></SummaryCardText>
          <SummaryCardText
            name="Minutes"
            rating={exercise.minutes}
            units="Minutes"
          ></SummaryCardText>
          <Text style={styles.subHeader}>My History</Text>
          <SingleRatingCard
            name={"March 9, 2022"}
            rating={3}
          ></SingleRatingCard>
          <SingleRatingCard
            name={"March 5, 2022"}
            rating={5}
          ></SingleRatingCard>
          <SingleRatingCard
            name={"March 2, 2022"}
            rating={4.5}
          ></SingleRatingCard>
          <SingleRatingCard
            name={"Febuary 27, 2022"}
            rating={5}
          ></SingleRatingCard>
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteP,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 16,
  },
});

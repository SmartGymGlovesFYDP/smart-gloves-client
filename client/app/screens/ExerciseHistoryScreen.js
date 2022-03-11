import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import PATH from "../navigation/Path";
import { Rating } from "react-native-rating-element";
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from "react-native";

export default function ExerciseHistoryScreen({ navigation, route }) {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const bicepCurlDesc =
    'A biceps curl usually starts with the arm in a fully extended position, holding a weight with a supinated (palms facing up) grip. A full repetition consists of bending or "curling" the elbow until it is fully flexed, then slowly lowering the weight to the starting position.';
  const benchPressDesc =
    "Here's how to Bench Press with proper form. Lie on the bench with your eyes under the bar. Grab the bar with a medium grip-width (thumbs around the bar!). Unrack the bar by straightening your arms. Lower the bar to your mid-chest. Press the bar back up until your arms are straight";
  const tricepExtDesc =
    "Slowly bend your elbows and lower the weight behind your head as far as you can. Remember to keep your trunk upright and your core engaged. The weight should follow the path of your spine. Then, at the lowest point, straighten your elbows and extend the weight back overhead.";

  function getDescription(exerciseName) {
    if (exerciseName == "Bicep Curl") {
      console.log("EXERCISE NAME = ", exerciseName);
      return bicepCurlDesc;
    } else if (exerciseName == "Bench Press") {
      return benchPressDesc;
    } else {
      return tricepExtDesc;
    }
  }

  // const allSingleDayExercises = route.params;
  const exercises = route.params;
  const allSingleDayExercises = [
    {
      id: 1,
      title: exercises.title,
      description: getDescription(exercises.title),
      image: require("../assets/generic.jpeg"),
      duration: 10,
      sets: 3,
      reps: 10,
      overallScore: exercises.overallScore,
      leftHandScore: exercises.leftHandScore,
      rightHandScore: exercises.rightHandScore,
      stars: exercises.stars,
      tips: exercises.tips,
    },
    // {
    //   id: 2,
    //   workoutName: "Jumping Jacks",
    //   description:
    //     "Jumping Jacks are easy and simple to do. First start with your hands by your side standing straight, then jump into a star pose and jump back. That's it!",
    //   image: require("../assets/generic.jpeg"),
    //   duration: 5,
    //   sets: 3,
    //   reps: 10,
    //   overallScore: 70,
    //   leftHandScore: 72,
    //   rightHandScore: 68,
    //   stars: 4.5,
    //   tips: ["Be careful for left hand motion", "Possible injury risk"],
    // },
    // {
    //   id: 3,
    //   workoutName: "Bench Press",
    //   description: "This is how you do a bench press!",
    //   image: require("../assets/generic.jpeg"),
    //   duration: 15,
    //   sets: 3,
    //   reps: 12,
    //   overallScore: 60,
    //   leftHandScore: 62,
    //   rightHandScore: 58,
    //   stars: 3.0,
    //   tips: ["Very poor form", "High injury risk!"],
    // },
  ];

  useEffect(() => {
    console.log(JSON.stringify(exercises));
  }, []);

  const date = exercises.timestamp; // TODO: Need to be updated
  const score = exercises.overallScore; // TODO: Will be calculated based on number of Exercises
  const stars = exercises.stars; // TODO: Will be calculated based on number of Exercises

  let data = allSingleDayExercises.map((exercise, index) => ({
    id: index + 1,
    title: exercise.title,
    description: exercise.description,
    minutes: exercise.duration,
    sets: exercise.sets,
    reps: exercise.reps,
    overallScore: exercise.overallScore,
    leftHandScore: exercise.leftHandScore,
    rightHandScore: exercise.rightHandScore,
    stars: exercise.stars,
    tips: exercise.tips,
    image: require("../assets/generic.jpeg"),
  }));

  return (
    <Screen style={styles.screen}>
      <Header
        title={date} // TODO: workout.date
        navigation={navigation}
        PATH={PATH.MY_WORKOUTS}
      />
      <ScrollView style={styles.scrollview}>
        <View>
          <View style={styles.scoreView}>
            <Text style={styles.title}>My Score</Text>
            <Text style={styles.scoreNumberText}>{score}</Text>
            <View style={styles.scoreStars}>
              <Rating rated={stars} size={20} ratingColor={colors.blue3P} />
            </View>
          </View>
          <View style={styles.exerciseListView}>
            <Text style={styles.title}>Exercises</Text>
            <FlatList
              data={data}
              keyExtractor={(data) => data.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  stars={item.stars}
                  image={item.image}
                  minutes={item.minutes}
                  sets={item.sets}
                  reps={item.reps}
                  onPress={() =>
                    navigation.navigate(PATH.EXERCISE_HISTORY_DETAILS, item)
                  }
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  scrollview: {
    backgroundColor: colors.icewhite,
    flex: 1,
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
  scoreView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
  },
  scoreNumberText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 36,
    borderStyle: "dashed",
    textAlign: "center",
  },
  scoreStars: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseListView: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    flexDirection: "column",
  },
});

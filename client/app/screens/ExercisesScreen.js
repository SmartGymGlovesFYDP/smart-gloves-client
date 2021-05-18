import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import PATH from "../navigation/Path";

const exercises = [
  {
    id: 1,
    title: "Bicep Curls",
    rating: 4.5,
    image: require("../assets/bicep-curl.jpeg"),
    minutes: 10,
    sets: 12,
    reps: 10,
  },
  {
    id: 2,
    title: "Jumping Jacks",
    rating: 3.5,
    image: require("../assets/jumping-jack.jpeg"),
    minutes: 15,
    sets: 6,
    reps: 15,
  },
  {
    id: 3,
    title: "Bench Press",
    rating: 5,
    image: require("../assets/dumbbell-bench-press.jpeg"),
    minutes: 18,
    sets: 8,
    reps: 12,
  },
  {
    id: 4,
    title: "Advance Bicep Curls",
    rating: 1.5,
    image: require("../assets/bicep-curl.jpeg"),
    minutes: 30,
    sets: 10,
    reps: 20,
  },
  {
    id: 5,
    title: "Jumping Jacks Superset",
    rating: 4.5,
    image: require("../assets/jumping-jack.jpeg"),
    minutes: 65,
    sets: 5,
    reps: 5,
  },
];

export default function ExercisesScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(exercise) => exercise.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            rating={item.rating}
            image={item.image}
            minutes={item.minutes}
            sets={item.sets}
            reps={item.reps}
            onPress={() => navigation.navigate(PATH.EXERCISE_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
});

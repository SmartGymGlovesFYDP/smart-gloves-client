import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

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
];

function ExercisesScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
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
            onPress={() => navigation.navigate(routes.EXERCISE_DETAILS, item)}
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
});

export default ExercisesScreen;

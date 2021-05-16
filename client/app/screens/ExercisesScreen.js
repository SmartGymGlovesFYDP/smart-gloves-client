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
  },
  {
    id: 2,
    title: "Jumping Jacks",
    rating: 4.2,
    image: require("../assets/jumping-jack.jpeg"),
  },
  {
    id: 3,
    title: "Bench Press",
    rating: 3.7,
    image: require("../assets/dumbbell-bench-press.jpeg"),
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
            subTitle={item.rating}
            image={item.image}
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
    backgroundColor: colors.light,
  },
});

export default ExercisesScreen;

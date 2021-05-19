import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExercisesScreen from "../screens/ExercisesScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
import PATH from "./path";

const Stack = createStackNavigator();

const ExerciseFeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={PATH.EXERCISE} component={ExercisesScreen} />
    <Stack.Screen
      name={PATH.EXERCISE_DETAILS}
      component={ExerciseDetailsScreen}
    />
  </Stack.Navigator>
);

export default ExerciseFeedNavigator;

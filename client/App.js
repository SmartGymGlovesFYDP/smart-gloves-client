import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import apiKeys from "./app/config/keys";
import SignUp from "./app/screens/SignUp";
import SignIn from "./app/screens/SignIn";
import Loading from "./app/screens/Loading";
import Dashboard from "./app/screens/Dashboard";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ExercisesScreen from "./app/screens/ExercisesScreen";
import AppNavigator from "./app/navigation/AppNavigator";
import ExerciseFeedNavigator from "./app/navigation/ExerciseFeedNavigator";
import ExerciseDetailsScreen from "./app/screens/ExerciseDetailsScreen";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <ExerciseFeedNavigator />
    </NavigationContainer>
  );
}

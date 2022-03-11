import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import PATH from "./Path";
// Tab 1: Home Screen and child screens
import HomeScreen from "../screens/HomeScreen";
import ExerciseHistoryDetailsScreen from "../screens/ExerciseHistoryDetailsScreen";
import ExerciseHistoryScreen from "../screens/ExerciseHistoryScreen";
import MyWorkoutScreen from "../screens/MyWorkoutScreen";
// Tab 2: My Progress Screen and child screens
import MyProgressScreen from "../screens/MyProgressScreen";
import MetricsScreen from "../screens/MetricsScreen";
// Tab 3: Exercise Screen and child screens
import ExercisesScreen from "../screens/ExercisesScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
import AddNewExerciseScreen from "../screens/AddNewExerciseScreen";
// Tab 4: Profile Screen and child screens
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={PATH.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PATH.MY_WORKOUTS}
      component={MyWorkoutScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PATH.EXERCISE_HISTORY}
      component={ExerciseHistoryScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PATH.EXERCISE_HISTORY_DETAILS}
      component={ExerciseHistoryDetailsScreen}
      options={{ headerShown: false }}
    />
    {/* ADD MORE SCREENS AS NECESSARY */}
  </Stack.Navigator>
);

// const MetricsStack = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name={PATH.METRICS}
//       component={MetricsScreen}
//       options={{ headerShown: false }}
//     />
//     {/* ADD MORE SCREENS AS NECESSARY */}
//   </Stack.Navigator>
// );

const MyProgressStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={PATH.MYPROGRESS}
      component={MyProgressScreen}
      options={{ headerShown: false }}
    />
    {/* ADD MORE SCREENS AS NECESSARY */}
  </Stack.Navigator>
);

const ExercisesStack = ({ navigation }) => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={PATH.EXERCISES}
      component={ExercisesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PATH.EXERCISE_DETAILS}
      component={ExerciseDetailsScreen}
    />
    <Stack.Screen
      name={PATH.EXERCISE_NEW}
      component={AddNewExerciseScreen}
    />
    {/* ADD MORE SCREENS AS NECESSARY */}
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name={PATH.PROFILE}
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={PATH.PROFILE_EDIT}
      component={ProfileEditScreen}
      options={{ headerShown: false }}
    />
    {/* ADD MORE SCREENS AS NECESSARY */}
  </Stack.Navigator>
);

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={PATH.HOME}
      tabBarOptions={{
        activeTintColor: colors.primary,
      }}
    >
      
      <Tab.Screen
        name={PATH.HOME}
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={PATH.MYPROGRESS}
        component={MyProgressStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={PATH.EXERCISES}
        component={ExercisesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={PATH.METRICS}
        component={MetricsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="axis-arrow" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={PATH.PROFILE}
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;

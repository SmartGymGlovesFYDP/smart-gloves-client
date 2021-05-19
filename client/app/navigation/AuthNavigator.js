import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PATH from "./path";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={PATH.SIGNIN}>
      <Stack.Screen
        name={PATH.SIGNIN}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PATH.SIGNUP}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;

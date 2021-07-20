import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PATH from "./Path";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={PATH.WELCOME} screenOptions={{animationEnabled: false}}>
      <Stack.Screen
        name={PATH.WELCOME}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name={PATH.FORGOT}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
